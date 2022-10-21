
from django.http import HttpResponse
from django.shortcuts import render, redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from sqlalchemy import false
from .serializers import ExperienceSerializer, ProfileSerializer, CommentSerializer
from .models import Experience, Profile
from rest_framework import status
from rest_framework import viewsets, views
from rest_framework.permissions import IsAuthenticated, AllowAny
from .forms import Post_Model_From
import jwt
from django.conf import settings



class PostView(viewsets.ModelViewSet):
    queryset = Experience.objects.all().order_by("-id")
    serializer_class = ExperienceSerializer


# =================================================================
@api_view(['GET'])
@permission_classes([AllowAny])
def getAllExperience(request):

    allExperience = Experience.objects.all()
    serializers = ExperienceSerializer(allExperience, many=True)
    return Response(serializers.data)

# =================================================================


@api_view(['GET'])
@permission_classes([AllowAny])
def getSingleExperience(request, pk):
    experience = Experience.objects.filter(id=pk)
    serializer = ExperienceSerializer(experience, many=false)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def getAllExperienceOfaProfile(request, pk):
    author = Profile.objects.get(id=pk)
    posts = author.experience_set.all().order_by("-id")
    serializer = ExperienceSerializer(posts, many=True)
    return Response(serializer.data)


def createExperience(request, pk, key):

    if key:

        profile = Profile.objects.get(id=pk)

        try:

            payload = jwt.decode(key, settings.SECRET_KEY,
                                 algorithms=['HS256'])
            userID = payload['user_id']

            if(profile.user.id == userID):
                form = Post_Model_From()
                context = {
                    'form': form,
                    'author': pk,
                    'profile': profile,
                }
                return render(request, 'create.html', context)
            else:
                return HttpResponse("You are not Authorized")
        except:
            return HttpResponse("You are not Authorized")

    else:
        return HttpResponse("You are not Authorized")


def savePost(request, pk):
    if request.method == 'POST':

        profile = Profile.objects.get(id=pk)
        p_form = Post_Model_From(request.POST, request.FILES or None)

        if p_form.is_valid():
            instance = p_form.save(commit=False)
            instance.author = profile
            instance.save()

    return redirect('http://localhost:3000/')

# =================================================================

@api_view(['PUT'])
def updateAExperience(request, pk):
    print(pk,request.data,"This is pk")
    id = pk
    note = Experience.objects.get(id=id)
    serializer = ExperienceSerializer(note, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =================================================================

@api_view(['DELETE'])
def deleteAExperience(request, pk):

    id = pk
    experience = Experience.objects.get(id=id)
    experience.delete()
    return Response({"success": True, 'Msg': "Data Deleted"})


# =================================================================

@api_view(['GET'])
def getProfile(request, pk):
    pquery = Profile.objects.get(id=pk)
    serializer = ProfileSerializer(pquery)
    return Response({"userdata": serializer.data})

# =================================================================

@api_view(['GET'])
@permission_classes([AllowAny])
def getTopProfile(request):
    topProfileID = []
    topProfilePostLen = []
    allProfile = Profile.objects.all()

    for author in allProfile:
        postsNumber = author.experience_set.all().count()
        topProfilePostLen.append(postsNumber)
        topProfileID.append(author.id)
    idAndLen = zip(topProfileID, topProfilePostLen)
    sortedIdAndLen = sorted(idAndLen, key=lambda x: x[1])
    sortedIdAndLen = sortedIdAndLen[::-1]

    pquery =[]
    for a in range(0,4):
        authorID = sortedIdAndLen[a][0]
        author = Profile.objects.get(id = authorID)
        pquery.append(author)
    
    serializers = ProfileSerializer(pquery,many=True)
    return Response(serializers.data)



    


# =================================================================


@api_view(['GET'])
def getMyProfile(request):
    user = request.user
    pquery = Profile.objects.get(user=user)
    serializer = ProfileSerializer(pquery)
    return Response({"userdata": serializer.data})


@api_view(['GET'])
@permission_classes([AllowAny])
def getComments(request, pk):
    post = Experience.objects.get(id=pk)
    comments = post.comment_set.all().order_by("-id")
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def postComment(request):

    data = {

        "post": request.data['post'],
        "user": request.data['user'],
        "body": request.data['comBody'],
    }

    serializer = CommentSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(['POST'])
def postLike(request):
    data = {

        "post": request.data['post'],
        "user": request.data['user'],
        "val": request.data['likeVal'],
    }

    post = Experience.objects.get(id=data["post"])
    user = Profile.objects.get(id = data['user'])

    if(data["val"] == "Unlike"):
        post.liked.remove(user)
    else:
        post.liked.add(user)

    return Response({"Success":True})

