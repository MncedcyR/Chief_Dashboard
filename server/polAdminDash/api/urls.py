from django.urls import path
from .views import get_employees,add_employees,login_view,get_logins,edit_employee,delete_employee,task_list,add_tasks,add_report,report_list


urlpatterns = [

    path('employees/', get_employees, name='get_employees'),
    path('employees/add/', add_employees, name='add_employees'),
    path('employees/add/login/',login_view, name="login"), 
    path('employees/add/login/logins/',get_logins, name="logins"),   
    path('employees/edit/<int:pk>/', edit_employee, name='edit_employee'),
    path('employees/delete/<int:pk>/', delete_employee, name='delete_employee'),
    path('tasks/', task_list, name='task-list'),
    path('tasks/add/', add_tasks, name='add_tasks'),
    path('reports/', report_list, name='report_list'),
    path('reports/add/', add_report, name='add-report'),

]



