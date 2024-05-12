export interface EventDetail {
  thumbnail?: string;
  eventname?: string;
  address?: {
      lat: string;
      lng: string;
  };
  category?: "Sport" | "Education" | "Workshop" | "Charity";
  viewer?: number;
  description?: string;
  Date?: {
      startDate?: Date;
      endDate?: Date;
      startTime?: string;
      endTime?: string;
  };
  requirement?: {
      age?: string;
      language?: string;
      skill?: string;
      timeCommitment?: string;
  };
  createdAt?: Date;
  formSubmission?: FormSubmission[];
}

interface FormSubmission {
  label: string;
  fieldType: string;
  answers: string[];
}
