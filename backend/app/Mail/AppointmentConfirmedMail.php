<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AppointmentConfirmedMail extends Mailable
{
    use Queueable, SerializesModels;
    public $appointment;
    public $user;
    /**
     * Create a new message instance.
     */
    public function __construct($appointment, $user)
    {
        $this->appointment = $appointment;
        $this->user = $user;
    }

    public function build()
    {
        return $this->subject('Tu cita ha sido confirmada')
            ->view('emails.appointment_confirmed')
            ->with([
                'appointment' => $this->appointment,
                'user' => $this->user,
            ]);
    }
}
