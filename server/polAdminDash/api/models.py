from django.db import models


class UserCredential(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.username 
    
    
class Employee(models.Model):
    name = models.CharField(max_length=100)
    badge = models.CharField(max_length=10, unique=True)
    role = models.CharField(max_length=50)
    department = models.CharField(max_length=50)
    status = models.CharField(max_length=20)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.name} ({self.badge})"

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    priority = models.CharField(max_length=10)
    due_date = models.DateField()
    status = models.CharField(max_length=20)
    assignee = models.CharField(max_length=100)

    def __str__(self):
        return self.title  

from django.db import models

class Report(models.Model):
    REPORT_TYPES = [
        ("Maintenance", "Maintenance"),
        ("Inspection", "Inspection"),
        ("Operational", "Operational"),
    ]
    
    STATUS_CHOICES = [
        ("Approved", "Approved"),
        ("Pending", "Pending"),
        ("Rejected", "Rejected"),
    ]
    
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    date = models.DateField()
    type = models.CharField(max_length=50, choices=REPORT_TYPES)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    file = models.FileField(upload_to='reports/', null=True, blank=True)

    def __str__(self):
        return f"{self.title} by {self.author} on {self.date}"      
    

    

