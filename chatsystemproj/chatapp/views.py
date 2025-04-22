from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *
from rest_framework.exceptions import PermissionDenied


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    permission_classes = [IsAuthenticated]

class ConversationListCreateView(generics.ListCreateAPIView):

    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (Conversation.objects
                .filter(participants=self.request.user)
                .prefetch_related('participants'))

    def create(self, request, *args, **kwargs):
        participants_data = request.data.get('participants', [])

        if len(participants_data) != 2:
            return Response(
                {'error': 'A conversation needs exactly two participants'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if str(request.user.id) not in map(str, participants_data):
            return Response(
                {'error': 'You are not a participant of this conversation'},
                status=status.HTTP_403_FORBIDDEN
            )
        users = User.objects.filter(id__in=participants_data)
        if users.count() != 2:
            return Response(
                {'error': 'A conversation needs exactly two participants'},
                status=status.HTTP_400_BAD_REQUEST
            )

        existing_conversation = Conversation.objects.filter(
            participants__id=participants_data[0]
        ).filter(
            participants__id=participants_data[1]
        ).distinct()

        if existing_conversation.exists():
            return Response(
                {'error': 'A conversation already exists between these participants'},
                status=status.HTTP_400_BAD_REQUEST
            )
        conversation = Conversation.objects.create()
        conversation.participants.set(users)

        #serialize the conversation
        serializer = self.get_serializer(conversation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class MessageListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        conversation_id = self.kwargs['conversation_id']
        conversation = self.get_conversation(conversation_id)

        return conversation.messages.order_by('timestamp')

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateMessageSerializer
        return MessageSerializer

    def perform_create(self, serializer):
        #fetch conversation and validate user participation
        print("Incoming conversation", self.request.data)
        conversation_id = self.kwargs['conversation_id']
        conversation = self.get_conversation(conversation_id)

        serializer.save(sender=self.request.user, conversation=conversation)

    def get_conversation(self, conversation_id):
        #check if user is a participant of the conversation, it helps to fetch the conversation and 
        #validate the participants
        conversation = get_object_or_404(Conversation, id=conversation_id)
        if self.request.user not in conversation.participants.all():
            raise PermissionDenied('You are not a participant of this conversation')
        return conversation

class MessageRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer

    def get_queryset(self):
        conversation_id = self.kwargs['conversation_id']
        return Message.objects.filter(conversation__id=conversation_id)

    def perform_destroy(self, instance):
        if instance.sender != self.request.user:
            raise PermissionDenied('You are not the sender of this message')
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


