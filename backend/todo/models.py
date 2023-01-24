from django.db import models

# Create your models here.

class Todo(models.Model):
    author = models.CharField(max_length=50)
    title =  models.CharField(max_length=100)
    description = models.TextField()
    
    def _str_(self):
        return self.title

