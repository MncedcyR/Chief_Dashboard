from rest_framework.decorators import api_view,parser_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Employee
from .serializers import EmployeeSerializer
from .models import UserCredential
from django.contrib.auth import authenticate
from .serializers import LoginSerializer
from .serializers import TaskSerializer
from .models import Task,Report
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import ReportSerializer



@api_view(['DELETE'])
def delete_employee(request, pk):
    try:
        employee = Employee.objects.get(pk=pk)
    except Employee.DoesNotExist:
        return Response({"detail": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

    employee.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT'])
def edit_employee(request, pk):
    try:
        employee = Employee.objects.get(pk=pk)
    except Employee.DoesNotExist:
        return Response({"detail": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = EmployeeSerializer(employee, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_employees(request):
    employees = Employee.objects.all()
    serializedData = EmployeeSerializer(employees,many=True).data
    return Response(serializedData)


@api_view(['POST'])
def add_employees(request):
    serializer = EmployeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_logins(request):
    logins = UserCredential.objects.all()
    serializedData = LoginSerializer(logins,many=True).data
    return Response(serializedData)

@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data.get("username")
        password = serializer.validated_data.get("password")

        user = authenticate(username=username, password=password)
        if user is not None:
            return Response({"success": True}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def task_list(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_tasks(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def add_report(request):
    serializer = ReportSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def report_list(request):
    tasks = Report.objects.all()
    serializer = ReportSerializer(tasks, many=True)
    return Response(serializer.data)




