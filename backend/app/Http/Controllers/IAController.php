<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class IAController extends Controller
{
    public function generateDescription(Request $request)
    {
        try {
            // Validar que venga el título y sea string no vacío
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => __('ia.validation_failed'),
                    'errors' => $validator->errors(),
                ], 422);
            }

            $title = $validator->validated()['title'];
            $locale = app()->getLocale();

            $prompt = match ($locale) {
                'es' => "Genera únicamente una descripción corta para un evento con el siguiente título: \"$title\". No incluyas introducciones, explicaciones ni saludos. Solo el texto de la descripción. Escribe la respuesta en español.",
                'en' => "Generate only a short description for an event titled: \"$title\". Do not include introductions, explanations, or greetings. Only the description text. Write the answer in English.",
                default => "Generate only a short description for an event titled: \"$title\". Do not include introductions, explanations, or greetings. Only the description text."
            };

            // Realizar la petición a OpenRouter
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),
                'HTTP-Referer' => config('app.url'),
                'X-Title' => 'Generador de eventos IA',
            ])->post('https://openrouter.ai/api/v1/chat/completions', [
                'model' => 'mistralai/devstral-small:free',
                'messages' => [
                    ['role' => 'system', 'content' => 'Eres un asistente que escribe descripciones atractivas para eventos.'],
                    ['role' => 'user', 'content' => $prompt],
                ],
            ]);

            // Comprobar si la respuesta tiene el campo esperado
            $description = $response->json('choices.0.message.content');

            if (!$description) {
                return response()->json([
                    'message' => __('ia.generation_failed'),
                ], 500);
            }

            return response()->json([
                'message' => __('ia.generated_successfully'),
                'description' => $description,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => __('ia.generation_error'),
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
