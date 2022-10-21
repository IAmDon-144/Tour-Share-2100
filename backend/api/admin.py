from django.contrib import admin
from .models import Profile,Experience,Comment

class ExperiencePostAdmin(admin.ModelAdmin):
    list_display = ('title','author','days_stayed','hotel_name','total_travellers','total_costs','rating','created',)

class CommentAdmin(admin.ModelAdmin):

    list_display = ('user','post','body','created',)

admin.site.register(Profile)
admin.site.register(Experience,ExperiencePostAdmin)
admin.site.register(Comment,CommentAdmin)