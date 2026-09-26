import React from 'react';
import { RenovationSimulator } from './simulators/RenovationSimulator';
import { MovingSimulator } from './simulators/MovingSimulator';
import { BeautyBookingSimulator } from './simulators/BeautyBookingSimulator';
import { CafeMenuSimulator } from './simulators/CafeMenuSimulator';
import { RealEstateSimulator } from './simulators/RealEstateSimulator';
import { SingleProductSimulator } from './simulators/SingleProductSimulator';
import { DigitalCardSimulator } from './simulators/DigitalCardSimulator';
import { CleaningSimulator } from './simulators/CleaningSimulator';
import { WeddingBudgetSimulator } from './simulators/WeddingBudgetSimulator';
import { TaxSalarySimulator } from './simulators/TaxSalarySimulator';

interface Props {
  serviceId: string;
}

export const ServiceSimulatorHost: React.FC<Props> = ({ serviceId }) => {
  switch (serviceId) {
    case 'renovation-calculator':
      return <RenovationSimulator />;
    case 'moving-freight-calculator':
      return <MovingSimulator />;
    case 'beauty-salon-booking':
      return <BeautyBookingSimulator />;
    case 'restaurant-qr-menu':
      return <CafeMenuSimulator />;
    case 'real-estate-calculator':
      return <RealEstateSimulator />;
    case 'single-product-landing':
      return <SingleProductSimulator />;
    case 'digital-business-card':
      return <DigitalCardSimulator />;
    case 'cleaning-carpet-calculator':
      return <CleaningSimulator />;
    case 'wedding-budget-calculator':
      return <WeddingBudgetSimulator />;
    case 'guilds-tax-salary-calculator':
      return <TaxSalarySimulator />;
    default:
      return <RenovationSimulator />;
  }
};
