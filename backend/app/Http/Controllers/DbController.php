<?php
namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Routing\Controller;

class DbController extends Controller
{
    public function index(): JsonResponse
    {
        $result = DB::table('messages')->select('content')->first();
        
        if (!$result) {
            return response()->json(['message' => 'No messages found in the database!']);
        }
        
        return response()->json(['message' => 'Backend Operativo, respuesta de la BD: ' . $result->content]);
    }
}