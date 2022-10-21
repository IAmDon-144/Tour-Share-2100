from django.db import models
from accounts.models import User
from django.core.validators import MinValueValidator, MaxValueValidator, FileExtensionValidator

# Create your models here.


class Profile(models.Model):
    first_name = models.CharField(max_length=15)
    last_name = models.CharField(max_length=15)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.EmailField(max_length=150, blank=True)
    avatar = models.ImageField(default='avatar.png', upload_to='avatars/')
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.id}-{self.user.username}-{self.user.username}'


EXPRESSIONS = (
    ('Good', 'Good'),
    ('Very Good', 'Very Good'),
    ('Not Bad', 'Not Bad'),
    ('Bad', 'Bad'),
    ('Worst', 'Worst'),
)
NABOOL = (

    ('Yes', 'Yes'),
    ('No', 'No'),
)


class Experience(models.Model):

    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, )

    image = models.ImageField(upload_to='posts', validators=[
                              FileExtensionValidator(['png', 'jpg', 'jpeg'])], blank=True)

    days_stayed = models.IntegerField()
    hotel_name = models.CharField(max_length=40, blank=True)
    total_travellers = models.IntegerField(default=1)
    total_costs = models.IntegerField(blank=False)
    rating = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(10)])
    food_experience = models.CharField(
        max_length=9, choices=EXPRESSIONS, blank=True)
    locals_behavior = models.CharField(
        max_length=9, choices=EXPRESSIONS, blank=True)
    worth = models.IntegerField(blank=True, validators=[
                                MinValueValidator(0), MaxValueValidator(100)])
    riskiness = models.IntegerField(
        blank=True, validators=[MinValueValidator(0), MaxValueValidator(100)])

    liked = models.ManyToManyField(
        Profile, default=None, related_name='likes', blank=True)

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.title}-{self.author.user.username}'

    class Meta:
        ordering = ['-created']


class Comment(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post = models.ForeignKey(Experience, on_delete=models.CASCADE)
    body = models.TextField(max_length=300)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.pk)
