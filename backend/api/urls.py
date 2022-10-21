from django.urls import path
from .views import getAllExperience, getSingleExperience, createExperience, updateAExperience, deleteAExperience, getProfile, getMyProfile, savePost, getComments, postComment, getAllExperienceOfaProfile, getTopProfile,postLike


urlpatterns = [


    path('get/', getAllExperience, name='get-all-datas'),
    path('get/<str:pk>/', getSingleExperience, name='get-single-data'),


    path('create-post/<str:pk>/<str:key>/',
         createExperience, name='post-data'),

         
    path('update-post/<str:pk>/', updateAExperience, name='update-data'),
    path('save-post/<str:pk>/', savePost, name='save-post'),
    path('delete/<str:pk>/', deleteAExperience, name='post-data'),
    path('get-profile/<str:pk>/', getProfile, name='get-profile'),

    path('get-profile-data/<str:pk>/',
         getAllExperienceOfaProfile, name='get-profile-data'),

    path('get-top-profile/',
         getTopProfile, name='get-top-profile'),


    path('get-my-profile/', getMyProfile, name='get-my-profile'),
    path('get-comments/<str:pk>/', getComments, name='get-comments'),
    path('post-comment/', postComment, name='post-comments'),

    path('post-like/', postLike, name='post-like'),




]
