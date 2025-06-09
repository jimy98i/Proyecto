<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $temporaryPassword;

    /**
     * Create a new message instance.
     */
    public function __construct($user, $temporaryPassword)
    {
        $this->user = $user;
        $this->temporaryPassword = $temporaryPassword;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Recuperación de contraseña')
            ->view('emails.password_reset')
            ->with([
                'user' => $this->user,
                'temporaryPassword' => $this->temporaryPassword,
            ]);
    }
}
