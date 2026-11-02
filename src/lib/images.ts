// High quality generated images for Yarpyae Beauty Salon
export const SALON_IMAGES = {
  hero: '/images/hero_beauty_salon_1793633322859.jpg',
  about: '/images/about_salon_interior_1793633325560.jpg',
  services: {
    signatureFacial: '/images/service_signature_facial_1793633325055.jpg',
    fullMakeup: '/images/service_full_makeup_1793633323718.jpg',
    browTint: '/images/service_brow_lash_1793633323373.jpg',
    lashLift: '/images/service_brow_lash_1793633323373.jpg',
    bridalConsultation: '/images/service_bridal_consultation_1793633325269.jpg',
  }
} as const;

export function getServiceImage(serviceName: string): string {
  const normalized = serviceName.toLowerCase();
  if (normalized.includes('facial') || normalized.includes('skin')) {
    return SALON_IMAGES.services.signatureFacial;
  }
  if (normalized.includes('makeup')) {
    return SALON_IMAGES.services.fullMakeup;
  }
  if (normalized.includes('brow')) {
    return SALON_IMAGES.services.browTint;
  }
  if (normalized.includes('lash')) {
    return SALON_IMAGES.services.lashLift;
  }
  if (normalized.includes('bridal') || normalized.includes('wedding')) {
    return SALON_IMAGES.services.bridalConsultation;
  }
  return SALON_IMAGES.services.signatureFacial;
}
