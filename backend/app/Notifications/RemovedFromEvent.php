<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RemovedFromEvent extends Notification
{
    use Queueable;

    protected $event;

    public function __construct($event)
    {
        $this->event = $event;
    }

    public function via($notifiable)
    {
        return ['mail', 'database']; // Enviar por correo y almacenar en la base de datos
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Has sido eliminado del evento: ' . $this->event->title)
            ->greeting('Hola ' . $notifiable->name . ',')
            ->line('Te informamos que has sido eliminado del evento "' . $this->event->title . '".')
            ->line('Si crees que esto fue un error, por favor contacta al organizador.')
            ->line('Gracias por usar nuestra plataforma.');
    }


    public function toArray($notifiable)
    {
        return [
            'event_id' => $this->event->id,
            'event_title' => $this->event->title,
            'removed_at' => now(),
        ];
    }
}
