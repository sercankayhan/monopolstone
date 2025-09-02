import { Request, Response } from 'express';
import { Contact } from '../models/Contact';

export const contactController = {
  submitContact: async (req: Request, res: Response) => {
    try {
      const { name, email, phone, company, subject, message } = req.body;

      // Validation
      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          message: 'Ad, e-posta, konu ve mesaj alanları zorunludur.'
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Geçerli bir e-posta adresi giriniz.'
        });
      }

      // Save to database
      const contact = new Contact({
        name,
        email,
        phone,
        company,
        subject,
        message
      });

      await contact.save();

      // Log the contact request
      console.log('Contact Form Submission:', {
        name,
        email,
        phone,
        company,
        subject,
        message,
        timestamp: new Date().toISOString()
      });

      // TODO: Implement email notification
      // await sendContactEmail({ name, email, phone, company, subject, message });

      res.status(200).json({
        success: true,
        message: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.'
      });

    } catch (error) {
      console.error('Contact form submission error:', error);
      res.status(500).json({
        success: false,
        message: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.'
      });
    }
  }
};
