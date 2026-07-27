export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      destinations: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          image: string | null
          is_active: boolean
          is_featured: boolean | null
          name: string
          related_package_slug: string | null
          state: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image?: string | null
          is_active?: boolean
          is_featured?: boolean | null
          name: string
          related_package_slug?: string | null
          state?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image?: string | null
          is_active?: boolean
          is_featured?: boolean | null
          name?: string
          related_package_slug?: string | null
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          created_at: string
          destination: string | null
          email: string | null
          id: string
          message: string | null
          name: string
          passengers: number | null
          phone: string
          pickup: string | null
          reference: string
          return_date: string | null
          source: string | null
          source_page: string | null
          status: string
          travel_date: string | null
          trip_type: string | null
          vehicle_type: string | null
        }
        Insert: {
          created_at?: string
          destination?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name: string
          passengers?: number | null
          phone: string
          pickup?: string | null
          reference?: string
          return_date?: string | null
          source?: string | null
          source_page?: string | null
          status?: string
          travel_date?: string | null
          trip_type?: string | null
          vehicle_type?: string | null
        }
        Update: {
          created_at?: string
          destination?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name?: string
          passengers?: number | null
          phone?: string
          pickup?: string | null
          reference?: string
          return_date?: string | null
          source?: string | null
          source_page?: string | null
          status?: string
          travel_date?: string | null
          trip_type?: string | null
          vehicle_type?: string | null
        }
        Relationships: []
      }
      fleets: {
        Row: {
          ac: boolean
          additional_charges: string | null
          available_local: boolean
          available_outstation: boolean
          category: string
          created_at: string
          description: string | null
          display_order: number
          driver_allowance: number | null
          features: string[] | null
          gallery: string[]
          id: string
          image_url: string | null
          is_active: boolean
          is_featured: boolean
          luggage: string | null
          min_km: number | null
          model: string | null
          name: string
          per_km_rate: number | null
          seating: number
          short_description: string | null
          slug: string
          starting_price: number | null
          suitable_for: string[] | null
          terms: string | null
        }
        Insert: {
          ac?: boolean
          additional_charges?: string | null
          available_local?: boolean
          available_outstation?: boolean
          category: string
          created_at?: string
          description?: string | null
          display_order?: number
          driver_allowance?: number | null
          features?: string[] | null
          gallery?: string[]
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          luggage?: string | null
          min_km?: number | null
          model?: string | null
          name: string
          per_km_rate?: number | null
          seating: number
          short_description?: string | null
          slug: string
          starting_price?: number | null
          suitable_for?: string[] | null
          terms?: string | null
        }
        Update: {
          ac?: boolean
          additional_charges?: string | null
          available_local?: boolean
          available_outstation?: boolean
          category?: string
          created_at?: string
          description?: string | null
          display_order?: number
          driver_allowance?: number | null
          features?: string[] | null
          gallery?: string[]
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          luggage?: string | null
          min_km?: number | null
          model?: string | null
          name?: string
          per_km_rate?: number | null
          seating?: number
          short_description?: string | null
          slug?: string
          starting_price?: number | null
          suitable_for?: string[] | null
          terms?: string | null
        }
        Relationships: []
      }
      hero_slides: {
        Row: {
          badge: string | null
          created_at: string
          description: string | null
          desktop_image: string | null
          display_order: number | null
          duration_ms: number | null
          heading: string
          highlight_word: string | null
          id: string
          is_active: boolean
          mobile_image: string | null
          overlay_color: string | null
          overlay_opacity: number | null
          primary_cta_label: string | null
          primary_cta_url: string | null
          rotating_words: string[] | null
          secondary_cta_label: string | null
          secondary_cta_url: string | null
          tablet_image: string | null
          text_position: string | null
          updated_at: string
          video_url: string | null
        }
        Insert: {
          badge?: string | null
          created_at?: string
          description?: string | null
          desktop_image?: string | null
          display_order?: number | null
          duration_ms?: number | null
          heading: string
          highlight_word?: string | null
          id?: string
          is_active?: boolean
          mobile_image?: string | null
          overlay_color?: string | null
          overlay_opacity?: number | null
          primary_cta_label?: string | null
          primary_cta_url?: string | null
          rotating_words?: string[] | null
          secondary_cta_label?: string | null
          secondary_cta_url?: string | null
          tablet_image?: string | null
          text_position?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          badge?: string | null
          created_at?: string
          description?: string | null
          desktop_image?: string | null
          display_order?: number | null
          duration_ms?: number | null
          heading?: string
          highlight_word?: string | null
          id?: string
          is_active?: boolean
          mobile_image?: string | null
          overlay_color?: string | null
          overlay_opacity?: number | null
          primary_cta_label?: string | null
          primary_cta_url?: string | null
          rotating_words?: string[] | null
          secondary_cta_label?: string | null
          secondary_cta_url?: string | null
          tablet_image?: string | null
          text_position?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      home_sections: {
        Row: {
          created_at: string
          cta_label: string | null
          cta_url: string | null
          description: string | null
          extra: Json | null
          heading: string | null
          id: string
          image: string | null
          is_active: boolean
          key: string
          label: string | null
          secondary_cta_label: string | null
          secondary_cta_url: string | null
          secondary_image: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          description?: string | null
          extra?: Json | null
          heading?: string | null
          id?: string
          image?: string | null
          is_active?: boolean
          key: string
          label?: string | null
          secondary_cta_label?: string | null
          secondary_cta_url?: string | null
          secondary_image?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          description?: string | null
          extra?: Json | null
          heading?: string | null
          id?: string
          image?: string | null
          is_active?: boolean
          key?: string
          label?: string | null
          secondary_cta_label?: string | null
          secondary_cta_url?: string | null
          secondary_image?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      how_it_works_steps: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean
          step_no: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean
          step_no: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean
          step_no?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      packages: {
        Row: {
          available_months: string[] | null
          booking_terms: string | null
          category: string
          created_at: string
          description: string | null
          display_order: number
          duration: string
          ending_point: string | null
          exclusions: string[] | null
          gallery: string[]
          highlights: string[] | null
          id: string
          image_url: string | null
          important_info: string[] | null
          inclusions: string[] | null
          is_active: boolean
          is_featured: boolean
          itinerary: Json | null
          location: string
          max_travellers: number | null
          min_travellers: number | null
          name: string
          price: number | null
          short_description: string | null
          slug: string
          starting_from: string | null
          suggested_vehicles: string[] | null
          travellers: string | null
        }
        Insert: {
          available_months?: string[] | null
          booking_terms?: string | null
          category: string
          created_at?: string
          description?: string | null
          display_order?: number
          duration: string
          ending_point?: string | null
          exclusions?: string[] | null
          gallery?: string[]
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          important_info?: string[] | null
          inclusions?: string[] | null
          is_active?: boolean
          is_featured?: boolean
          itinerary?: Json | null
          location: string
          max_travellers?: number | null
          min_travellers?: number | null
          name: string
          price?: number | null
          short_description?: string | null
          slug: string
          starting_from?: string | null
          suggested_vehicles?: string[] | null
          travellers?: string | null
        }
        Update: {
          available_months?: string[] | null
          booking_terms?: string | null
          category?: string
          created_at?: string
          description?: string | null
          display_order?: number
          duration?: string
          ending_point?: string | null
          exclusions?: string[] | null
          gallery?: string[]
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          important_info?: string[] | null
          inclusions?: string[] | null
          is_active?: boolean
          is_featured?: boolean
          itinerary?: Json | null
          location?: string
          max_travellers?: number | null
          min_travellers?: number | null
          name?: string
          price?: number | null
          short_description?: string | null
          slug?: string
          starting_from?: string | null
          suggested_vehicles?: string[] | null
          travellers?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          enquiry_defaults: Json | null
          icon: string | null
          id: string
          image: string | null
          is_active: boolean
          is_featured: boolean | null
          link_url: string | null
          short_desc: string | null
          slug: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          enquiry_defaults?: Json | null
          icon?: string | null
          id?: string
          image?: string | null
          is_active?: boolean
          is_featured?: boolean | null
          link_url?: string | null
          short_desc?: string | null
          slug?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          enquiry_defaults?: Json | null
          icon?: string | null
          id?: string
          image?: string | null
          is_active?: boolean
          is_featured?: boolean | null
          link_url?: string | null
          short_desc?: string | null
          slug?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      stats: {
        Row: {
          created_at: string
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean
          label: string
          prefix: string | null
          suffix: string | null
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean
          label: string
          prefix?: string | null
          suffix?: string | null
          updated_at?: string
          value?: number
        }
        Update: {
          created_at?: string
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean
          label?: string
          prefix?: string | null
          suffix?: string | null
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          created_at: string
          customer_location: string | null
          customer_name: string
          destination: string | null
          display_order: number
          email: string | null
          fleet_used: string | null
          id: string
          is_approved: boolean
          is_featured: boolean
          is_video: boolean
          package_used: string | null
          phone: string | null
          rating: number
          review: string
          service_category: string | null
          title: string | null
          travel_date: string | null
          travel_type: string | null
          video_thumbnail: string | null
          video_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          customer_location?: string | null
          customer_name: string
          destination?: string | null
          display_order?: number
          email?: string | null
          fleet_used?: string | null
          id?: string
          is_approved?: boolean
          is_featured?: boolean
          is_video?: boolean
          package_used?: string | null
          phone?: string | null
          rating?: number
          review: string
          service_category?: string | null
          title?: string | null
          travel_date?: string | null
          travel_type?: string | null
          video_thumbnail?: string | null
          video_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          customer_location?: string | null
          customer_name?: string
          destination?: string | null
          display_order?: number
          email?: string | null
          fleet_used?: string | null
          id?: string
          is_approved?: boolean
          is_featured?: boolean
          is_video?: boolean
          package_used?: string | null
          phone?: string | null
          rating?: number
          review?: string
          service_category?: string | null
          title?: string | null
          travel_date?: string | null
          travel_type?: string | null
          video_thumbnail?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      why_us_points: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "user"],
    },
  },
} as const
