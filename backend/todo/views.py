from django.http import JsonResponse
from rest_framework.views import APIView , csrf_exempt

from .serializers import TodoSerializer
from .models import Todo

from rest_framework.decorators import api_view, permission_classes, authentication_classes 

import json
# from rest_framework.permissions import IsAuthenticated
# from rest_framework_jwt.authentication import JSONWebTokenAuthentication

class TodoView(APIView):
    
    @api_view(['GET'])
    @csrf_exempt
    # @permission_classes(IsAuthenticated,)
    # @authentication_classes(JSONWebTokenAuthentication)
    def todos_list(request):
        
        data = Todo.objects.all()

        serializer = TodoSerializer(data , context={'request' : request} , many=True)

        return JsonResponse(serializer.data, safe=False)

    @api_view(["POST"])
    @csrf_exempt
    def todos_filter(request):
        jsonRequestBody = json.loads(request.body.decode("utf-8"))

        # data = Todo.objects.filter(id=jsonRequestBody['id'])
        # data = Todo.objects.filter(id__gte=jsonRequestBody['id'])
        data = Todo.objects.filter(id__lte=jsonRequestBody['id'] , title__regex=jsonRequestBody['title'])

        if data.__len__() == 0:
            return JsonResponse({'status' : "Not Find Todo"} , safe=False)

        # data.update(title=jsonRequestBody['title'] , description=jsonRequestBody['description']) 

        serializer = TodoSerializer(data , context={'request' : request} , many=True)

        return JsonResponse(serializer.data , safe=False)

    @api_view(["POST"])
    @csrf_exempt
    def todo_add(request):
        if request.method == 'POST' :

            jsonRequestBody = json.loads(request.body.decode('utf-8'))

            try: 
                Todo.objects.create(
                    title = jsonRequestBody['title'] ,
                    description = jsonRequestBody['description'] ,
                    completed = jsonRequestBody['completed']
                )
            except :
                return JsonResponse({'status' : 'Error New'} , safe=False)

            serializer = TodoSerializer(Todo.objects.all() , context={'request' : request} , many=True)

            return JsonResponse(serializer.data , safe=False)

    @api_view(["POST"])
    @csrf_exempt
    def todo_delete(request):     
        jsonRequestBody = json.loads(request.body.decode('utf-8'))

        data = Todo.objects.filter(id = jsonRequestBody['id'])

        if data.__len__() == 0 :
            return JsonResponse({'status' : 'Not Find Object'} , safe=False)
        
        data.delete()

        serializer = TodoSerializer(Todo.objects.all() , context={'request' : request} , many=True)

        return JsonResponse(serializer.data , safe=False)