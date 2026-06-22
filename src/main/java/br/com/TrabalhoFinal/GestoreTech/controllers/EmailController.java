package br.com.TrabalhoFinal.GestoreTech.controllers;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    @Autowired
    private JavaMailSender mailSender;

    @GetMapping("/email/{destinatario}")
    public String enviarEmailHtml(@PathVariable String destinatario) {

        try {

            MimeMessage message =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            // destinatário
            helper.setTo(destinatario);

            // assunto
            helper.setSubject("Redefinir Senha");

            // conteúdo html
            String html = ""
                    + "<div style='background-color: #e0e7ff; padding: 40px 20px; font-family: Segoe UI, Arial, sans-serif; min-height: 400px;'>\n"
                    + "\n"
                    + "<div style='max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden; border: 1px solid #f3f4f6;'>\n"
                    + "\n"
                    + "\n"
                    + "<div style='background-color: #5d67ff; height: 6px; width: 100%;'></div>\n"
                    + "\n"
                    + "<div style='padding: 32px 40px;'>\n"
                    + "\n"
                    + "\n"
                    + "<div style='text-align: center; margin-bottom: 24px;'>\n"
                    + "<span style='background-color: #5d67ff; color: #ffffff; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 20px; margin-right: 8px;'>G</span>\n"
                    + "<span style='font-size: 22px; font-weight: 700; color: #1a1a1a; letter-spacing: -0.5px;'>Gestor<span style='color: #4f46e5;'>&Tech</span></span>\n"
                    + "</div>\n"
                    + "\n"
                    + "<h2 style='color: #4338ca; font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 12px; text-align: center;'>\n"
                    + "Recuperação de Senha\n"
                    + "</h2>\n"
                    + "\n"
                    + "<p style='color: #6b7280; font-size: 15px; line-height: 1.6; margin-top: 0; margin-bottom: 24px; text-align: center;'>\n"
                    + "Olá! Recebemos uma solicitação para redefinir a senha da sua conta. Clique no botão abaixo para escolher uma nova credencial de acesso.\n"
                    + "</p>\n"
                    + "\n"
                    + "\n"
                    + "<div style='text-align: center; margin-bottom: 24px;'>\n"
                    + "<a href='http://localhost:8000/redefinirSenha.html?email=" + destinatario + "' target='_blank' style='display: inline-block; background-color: #4f46e5; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 10px; box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);'>\n"
                    + "Redefinir Minha Senha\n"
                    + "</a>\n"
                    + "</div>\n"
                    + "\n"
                    + "\n"
                    + "<div style='background-color: #fbfbfb; border-left: 4px solid #f0b429; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px; border-top: 1px solid #f3f4f6; border-right: 1px solid #f3f4f6; border-bottom: 1px solid #f3f4f6;'>\n"
                    + "<p style='margin: 0; font-size: 13px; color: #627d98; line-height: 1.5;'>\n"
                    + "<strong>Importante:</strong> Este link expirará em breve. Se você não solicitou essa alteração, ignore este e-mail com segurança. Sua senha atual continuará funcionando.\n"
                    + "</p>\n"
                    + "</div>\n"
                    + "\n"
                    + "<hr style='border: 0; border-top: 1px solid #f3f4f6; margin-bottom: 20px;'>\n"
                    + "\n"
                    + "\n"
                    + "<p style='color: #9ca3af; font-size: 12px; line-height: 1.5; margin: 0; text-align: center;'>\n"
                    + "Se o botão não funcionar, copie e cole o link abaixo no seu navegador:<br>\n"
                    + "<a href='http://localhost:8000/redefinirSenha.html?email=" + destinatario + "' target='_blank' style='color: #4f46e5; text-decoration: underline; word-break: break-all;'>\n"
                    + "http://localhost:8000/redefinirSenha.html?email=" + destinatario + "\n"
                    + "</a>\n"
                    + "</p>\n"
                    + "</div>\n"
                    + "</div>\n"
                    + "\n"
                    + "\n"
                    + "<div style='text-align: center; margin-top: 24px;'>\n"
                    + "<p style='color: #9ca3af; font-size: 12px; margin: 0;'>\n"
                    + "© 2026 Gestor&Tech. Todos os direitos reservados.\n"
                    + "</p>\n"
                    + "</div>\n"
                    + "</div>";

            helper.setText(html, true);

            // envia email
            mailSender.send(message);

            return "Email enviado com sucesso!";

        } catch (Exception e) {

            e.printStackTrace();

            return "Erro ao enviar email: " + e.getMessage();
        }
    }
}