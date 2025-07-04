from rest_framework import serializers
from .models import Employee,Task,Report


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
        extra_kwargs = {
            'email': {'required': True},
            'status': {'required': True},
            'department': {'required': True},
            'role': {'required': True},
            'badge': {'required': True},
            'name': {'required': True},
            
        }  
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'        


class LoginSerializer(serializers.Serializer):
    class Meta:
        username = serializers.CharField()
        password = serializers.CharField()




