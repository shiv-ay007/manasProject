import React from 'react';
import { Route } from 'react-router-dom';
import TreatmentDetail from '../pages/Treatments/TreatmentDetail';

/**
 * Treatment Routing configuration
 * Supports both standard 2-segment routes (/treatment/:category/:slug)
 * and single-slug routes (/treatment/:slug) for maximum link reliability.
 */
export const treatmentRoutes = [
  <Route
    key="treatment-category-slug"
    path="/treatment/:category/:slug"
    element={
      <div className="pt-[68px] lg:pt-[76px]">
        <TreatmentDetail />
      </div>
    }
  />,
  <Route
    key="treatment-slug-only"
    path="/treatment/:slug"
    element={
      <div className="pt-[68px] lg:pt-[76px]">
        <TreatmentDetail />
      </div>
    }
  />,
];

export default treatmentRoutes;
