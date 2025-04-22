from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('auth/register/', CreateUserView.as_view(), name='register'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('conversations/', ConversationListCreateView.as_view(), name='conversation_list'),
    path('conversations/<int:conversation_id>/messages/', MessageListCreateView.as_view(), name='message_list_create'),
    path('conversations/<int:conversation_id>/messages/<int:pk>/', MessageRetrieveDestroyView.as_view(), name='message_detail_destroy'),
    
]