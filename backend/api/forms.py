from django import forms
from .models import Experience


class Post_Model_From(forms.ModelForm):
    class Meta:
        model = Experience
        fields = ['title', 'content', 'image', 'days_stayed', 'hotel_name', 'total_travellers',
                  'total_costs', 'rating', 'food_experience', 'locals_behavior', 'worth', 'riskiness', ]

        widgets = {

            'title': forms.TextInput(attrs={'class': 'form-control', 'placeholder': "Enter a Title"}),
            'content': forms.Textarea(attrs={'class': 'form-control', 'placeholder': "Enter a Detailed Description of Your Experience", 'rows': '6'}),

            'days_stayed': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': "Enter the number of days You had Stayed"}),

            'hotel_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': "Enter the name of the Hotel You had Stayed"}),

            'total_travellers': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': "Enter the number of Travellers"}),

            'total_costs': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': "Enter the Total Costs of all Travellers"}),

            'rating': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': "Give a Overall Rating out of 10"}),

            'food_experience': forms.Select(attrs={'class': 'form-control', }),
            
            'locals_behavior': forms.Select(attrs={'class': 'form-control',}),
            
            'worth': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': "Give a Number of Wortness of this place out of 100"}),

            'riskiness': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': "Give a Number of Riskness of this place out of 100"}),

        }
