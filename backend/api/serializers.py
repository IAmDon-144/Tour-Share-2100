from rest_framework import serializers
from .models import Experience,Comment,Profile
from accounts.serializers import UserCreateSerializer




class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

    def to_representation(self,instance):
        response = super().to_representation(instance)
        response['user'] = ProfileSerializer(instance.author).data
        return response
        
    # def validate(self, obj):
    #     obj['user'] = self.context['request'].user
    #     return obj

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ["user"]

        
    def to_representation(self,instance):
        response = super().to_representation(instance)
        response['user'] = UserCreateSerializer(instance.user).data
        return response



class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

        
    def to_representation(self,instance):
        response = super().to_representation(instance)
        response['user'] = ProfileSerializer(instance.user).data
        return response