# Plan de refactorización del backend (Laravel)

Objetivo: dejar el backend bien estructurado (Form Requests, Policies, API Resources, Services, Enums…) y **aprender Laravel haciéndolo**. Este documento es una guía de trabajo: marca las casillas según avances.

## Punto de partida

Medido sobre `backend/app` el 2026-10-23.

| Dato | Valor | Qué indica |
|---|---|---|
| Líneas en controladores | 1.845 | Toda la lógica vive en los controladores |
| Carpetas `Requests`, `Resources`, `Policies`, `Services`, `Enums` | No existen | Falta toda la estructura por capas |
| `try { … }` / `getMessage()` | 49 / 48 | Manejo de errores copiado y pegado, y filtra datos internos |
| `Validator::make` | 16 | Validación dentro de los controladores |
| `makeVisible` | 15 | Parche porque `$hidden` oculta campos que luego hay que mostrar |
| `Auth::user()` / `User::find($user->id)` | 23 / 6 | La segunda es redundante: ya tienes el usuario |
| Strings mágicos (`'premium'`, `'admin'`, `'pending'`…) | Decenas | Piden `Enums` |
| Tests reales | 0 | Es lo primero que falta |

## Cómo trabajar

- **Rebanadas verticales, no capas.** Elige **Eventos** como piloto y refactorízalo de principio a fin (test → enum → request → policy → resource → service). Después repite con Invitaciones, Ubicaciones y el resto.
- **Una rama y un PR por fase (o por módulo).**
- **El frontend depende de la forma de las respuestas** (`message`, `events`, `errors`). Los tests de la Fase 0 son tu contrato: si siguen en verde, no rompes el frontend.
- **Reglas de oro** al terminar cada módulo:
  - [ ] El controlador no valida (lo hace un Form Request).
  - [ ] El controlador no comprueba roles a mano (lo hace una Policy).
  - [ ] El controlador no construye JSON a mano (lo hace un Resource).
  - [ ] No hay `try/catch` ni `$e->getMessage()` en la respuesta.
  - [ ] El controlador tiene 15 líneas o menos por método.

## Estructura objetivo

```
app/
  Enums/             UserRole, UserType, InvitationStatus
  Exceptions/        ParticipantLimitReached …
  Http/Controllers/  Api/V1/…
  Http/Requests/     Event/StoreEventRequest.php …
  Http/Resources/    EventResource.php …
  Policies/          EventPolicy.php …
  Services/          InvitationService.php …
  Observers/
tests/Feature/       Events/  Invitations/ …
```

---

## Fase 0. Tests antes de tocar nada

La más importante: sin ella, cualquier refactor es a ciegas.

- [ ] Factories para `Event`, `Location`, `EventCategory`, `EventInvitation`, `PremiumPlan` (hoy solo existe la de `User`).
- [ ] Decidir PHPUnit o Pest (Pest es más legible).
- [ ] Feature tests con `RefreshDatabase` del comportamiento actual: login/registro, CRUD de eventos, flujo de invitaciones, permisos.
- [ ] Tests de los agujeros ya cerrados: borrar una ubicación ajena, listar participantes sin ser miembro, unirse sin invitación.

**Aprendes:** testing HTTP, factories, `actingAs`, `assertJson`, `assertStatus`.

## Fase 1. Subir a Laravel 12

Con los tests puestos la subida es segura. `composer audit` marca un aviso alto en `laravel/framework` que afecta a `<12.60.0`.

- [ ] Seguir la guía oficial de upgrade.
- [ ] Comprobar compatibilidad de `tymon/jwt-auth`.
- [ ] Tests en verde y `composer audit` limpio.

**Aprendes:** leer una guía de upgrade y usar los tests como red de seguridad.

## Fase 2. Enums

- [ ] `UserRole` (`user`, `admin`), `UserType` (`free`, `premium`), `InvitationStatus` (`pending`, `accepted`, `rejected`).
- [ ] `casts` en los modelos.
- [ ] Reemplazar los strings mágicos del código.

**Aprendes:** backed enums y casting en Eloquent.

## Fase 3. Form Requests

Sustituye los 16 `Validator::make`.

- [ ] `StoreEventRequest`, `UpdateEventRequest`, `RegisterRequest`, `LoginRequest`…
- [ ] Mover la comprobación manual "fin > inicio" (Carbon) a `after()`.
- [ ] Regla de contraseña como `Rule` propia.
- [ ] Mantener el formato de error que lee el frontend (`message`, `errors`), ajustándolo en `withExceptions` de `bootstrap/app.php`.

**Aprendes:** `rules()`, `authorize()`, `messages()`, `prepareForValidation()`, `after()`.

## Fase 4. Policies

Eliminan los middlewares `EnsureUserOwns…`, `IsAdmin`, `EnsureUserCreatorOrAdmin` y los `if ($user->role !== 'admin')` sueltos.

- [ ] `EventPolicy`, `LocationPolicy`, `EventInvitationPolicy`.
- [ ] `Gate::before` para el administrador.
- [ ] Usarlas con `$this->authorize()` o `can:` en las rutas.
- [ ] Decisión de diseño: las ubicaciones no guardan quién las creó. Valorar una migración con `user_id` en `locations` (migrar con datos existentes).

**Aprendes:** autorización centralizada. Es justo lo que habría evitado el agujero del `DELETE /locations`.

## Fase 5. API Resources

Sustituyen a `makeVisible` y al truco de `$hidden`.

- [ ] `UserResource` (variante pública: nombre y foto; variante privada: email y rol).
- [ ] `EventResource`, `LocationResource`, `CategoryResource`.
- [ ] Mantener la envoltura `{message, events}` con `additional()`.
- [ ] Usar `whenLoaded()` para evitar N+1.

**Aprendes:** `$this->when()`, `whenLoaded()`, colecciones, `additional()`.

## Fase 6. Services o Actions

Sacar la lógica de negocio de los controladores.

- [ ] `InvitationService` (invitar, aceptar, rechazar).
- [ ] Servicio de plan premium.
- [ ] Servicio de foto de perfil (guardar y borrar).
- [ ] Servicio de descripción con IA (OpenRouter), con timeout y reintentos.
- [ ] Hacer atómico el límite de participantes: `DB::transaction` + `lockForUpdate` (hoy se comprueba y se hace `attach` en pasos separados).
- [ ] `CheckPremiumStatus` modifica la BD en un `GET /me`: moverlo a un comando programado (`schedule`).

**Aprendes:** inyección de dependencias, Service vs Action, `Http::fake()`, transacciones.

## Fase 7. Errores en un solo sitio

- [ ] Borrar los 49 `try/catch`.
- [ ] Manejar en `withExceptions` (`bootstrap/app.php`): no encontrado → 404, sin permiso → 403, validación → 422.
- [ ] Excepciones propias (`ParticipantLimitReached`…).
- [ ] No devolver nunca `$e->getMessage()`; registrarlo con `Log`.

**Aprendes:** el flujo de excepciones de Laravel y `report`/`render`.

## Fase 8. Eloquent y datos

- [ ] `Model::shouldBeStrict()` fuera de producción para cazar N+1.
- [ ] Paginación (`/my-events` hace `get()` de todo).
- [ ] Query scopes (por ejemplo `upcoming`).
- [ ] Índices (`events.creator_id`, `events.start_date`, `event_invitations.recipient_id`) y claves foráneas en las columnas `uuid`.
- [ ] Observers en lugar del `booted()` de `Event` y `EventInvitation`.
- [ ] Opcional: unir `start_date`/`start_time` en `starts_at` (UTC) y repasar zonas horarias con Carbon.

**Aprendes:** eager loading, scopes, observers, migraciones con índices y claves.

## Fase 9. API y seguridad

- [ ] `Route::apiResource` y rutas RESTful (`/my-events` y `/user/participating-events` hoy no lo son).
- [ ] Prefijo `/api/v1`.
- [ ] `RateLimiter::for()` en login y registro (hoy no hay límite).
- [ ] Recuperación de contraseña y verificación de email.
- [ ] Más adelante: valorar Sanctum en lugar de `tymon/jwt-auth`.

**Aprendes:** rate limiting, notificaciones de correo, tokens de API.

## Fase 10. Calidad automática

- [ ] Pint (ya está en `require-dev`).
- [ ] Larastan.
- [ ] Workflow de GitHub Actions: tests, Pint, `composer audit` y `tsc` del frontend.
- [ ] Documentación de la API con Scramble o Scribe (OpenAPI).

**Aprendes:** CI, análisis estático, documentación automática.

---

## Bugs ya detectados (los tests deberían sacarlos a la luz)

- [ ] En las notificaciones, `Route::delete('/{id}')` va antes que `Route::delete('/clear')`, así que `/notifications/clear` probablemente lo captura `{id}`.
- [ ] `LocaleController` guarda el idioma en sesión, pero la API no usa sesión.
- [ ] `Accept-Language` se pasa sin validar a `setLocale`.
- [ ] El registro revela si un email ya existe.
- [ ] El límite de participantes se comprueba y se aplica en pasos no atómicos.
- [ ] `AdminUserSeeder` usa `env()` fuera de `config/`.

## Recursos

- Documentación oficial de Laravel: Eloquent Resources, Authorization, Validation, Testing, Errors.
- Laracasts.
- *Laravel Beyond CRUD* (Spatie) sobre cómo estructurar proyectos grandes.

> Los recursos no están verificados a fecha de hoy: compruébalos antes de basarte en ellos.
