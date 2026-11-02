// High quality beauty salon image assets with multi-layer resolution:
// 1. Vite bundled assets (bundled and hashed at build time, 100% reliable on Vercel)
// 2. Public static URLs (/images/...)
// 3. High-definition beauty salon CDN fallbacks (in case of network or deployment edge cases)

import heroAsset from '../assets/images/hero_beauty_salon_1793633322859.jpg';
import aboutAsset from '../assets/images/about_salon_interior_1793633325560.jpg';
import signatureFacialAsset from '../assets/images/service_signature_facial_1793633325055.jpg';
import fullMakeupAsset from '../assets/images/service_full_makeup_1793633323718.jpg';
import browLashAsset from '../assets/images/service_brow_lash_1793633323373.jpg';
import bridalConsultationAsset from '../assets/images/service_bridal_consultation_1793633325269.jpg';

export const FALLBACK_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80',
  about: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
  signatureFacial: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
  fullMakeup: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
  browTint: 'https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=800&q=80',
  lashLift: 'https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=800&q=80',
  bridalConsultation: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
} as const;

export const SALON_IMAGES = {
  hero: heroAsset || '/images/hero_beauty_salon_1793633322859.jpg',
  about: aboutAsset || '/images/about_salon_interior_1793633325560.jpg',
  services: {
    signatureFacial: signatureFacialAsset || '/images/service_signature_facial_1793633325055.jpg',
    fullMakeup: fullMakeupAsset || '/images/service_full_makeup_1793633323718.jpg',
    browTint: browLashAsset || '/images/service_brow_lash_1793633323373.jpg',
    lashLift: browLashAsset || '/images/service_brow_lash_1793633323373.jpg',
    bridalConsultation: bridalConsultationAsset || '/images/service_bridal_consultation_1793633325269.jpg',
  }
} as const;

export function getServiceImage(serviceName: string): string {
  const normalized = (serviceName || '').toLowerCase();
  if (normalized.includes('facial') || normalized.includes('skin') || normalized.includes('မျက်နှာ')) {
    return SALON_IMAGES.services.signatureFacial;
  }
  if (normalized.includes('makeup') || normalized.includes('မိတ်ကပ်')) {
    return SALON_IMAGES.services.fullMakeup;
  }
  if (normalized.includes('brow') || normalized.includes('မျက်ခုံး')) {
    return SALON_IMAGES.services.browTint;
  }
  if (normalized.includes('lash') || normalized.includes('မျက်တောင်')) {
    return SALON_IMAGES.services.lashLift;
  }
  if (normalized.includes('bridal') || normalized.includes('wedding') || normalized.includes('မင်္ဂလာဆောင်')) {
    return SALON_IMAGES.services.bridalConsultation;
  }
  return SALON_IMAGES.services.signatureFacial;
}

export function getServiceFallbackImage(serviceName: string): string {
  const normalized = (serviceName || '').toLowerCase();
  if (normalized.includes('facial') || normalized.includes('skin') || normalized.includes('မျက်နှာ')) {
    return FALLBACK_IMAGES.signatureFacial;
  }
  if (normalized.includes('makeup') || normalized.includes('မိတ်ကပ်')) {
    return FALLBACK_IMAGES.fullMakeup;
  }
  if (normalized.includes('brow') || normalized.includes('မျက်ခုံး')) {
    return FALLBACK_IMAGES.browTint;
  }
  if (normalized.includes('lash') || normalized.includes('မျက်တောင်')) {
    return FALLBACK_IMAGES.lashLift;
  }
  if (normalized.includes('bridal') || normalized.includes('wedding') || normalized.includes('မင်္ဂလာဆောင်')) {
    return FALLBACK_IMAGES.bridalConsultation;
  }
  return FALLBACK_IMAGES.signatureFacial;
}
