import { t } from "i18next";
import { toast } from "react-hot-toast";

/**
 * Valida las fechas y horas de un evento.
 * Muestra un toast de error si hay problemas.
 * 
 * @param startDate - Fecha de inicio (YYYY-MM-DD)
 * @param endDate - Fecha de fin (YYYY-MM-DD)
 * @param startTime - Hora de inicio (HH:mm)
 * @param endTime - Hora de fin (HH:mm)
 * @returns boolean - true si todo es válido, false si hay errores
 */
export function validateEventDates(
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string
): boolean {
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);

  if (start > end) {
    toast.error(t("validation.startBeforeEnd"));
    return false;
  }

  if (startDate === endDate) {
    const startHour = start.getHours();
    const endHour = end.getHours();
    const startMinutes = start.getMinutes();
    const endMinutes = end.getMinutes();

    const totalStartMinutes = startHour * 60 + startMinutes;
    const totalEndMinutes = endHour * 60 + endMinutes;

    if (totalEndMinutes - totalStartMinutes < 60) {
      toast.error(t("validation.endTimeOneHourAfterStart"));
      return false;
    }
  }

  return true;
}
