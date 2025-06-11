<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class EventInvitationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $invitation;

    public function __construct($invitation)
    {
        $this->invitation = $invitation;
    }

    public function via($notifiable)
    {
        return ['mail', 'database']; // Enviar por correo y almacenar en la base de datos
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('¡Has sido invitado a un evento!')
            ->line('Has recibido una invitación para el evento: ' . $this->invitation->event->title)
            ->line('Te ha invitado: ' . $this->invitation->sender->name)
            ->action('Ver Invitación', env('FRONTEND_URL') . '/notification')
            ->line('Gracias por usar nuestra aplicación.');
    }

    public function toArray($notifiable)
    {
        return [
            'invitation_id' => $this->invitation->id,
            'event_id' => $this->invitation->event_id,
            'event_title' => $this->invitation->event->title,
            'inviter_name' => $this->invitation->sender->name,
        ];
    }
}
