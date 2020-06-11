import { startOfHour } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmetsRepository';
import Appointment from '../models/appointments';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);
    const findAppointment = this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointment) {
      throw new Error('This appointment is already booked');
    }
    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
