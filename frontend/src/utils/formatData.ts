export const formatDate = (isoString: string) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    }).format(new Date(isoString));
  };
  