from django.urls import path
from .views import RoomView, CreateRoomView, GetRoomView, JoinRoom, UserInRoom, LeaveRoom

# this handles api django app's url
urlpatterns = [
    # .as_view() is to convert the viewclass as view
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoomView.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view())

]
