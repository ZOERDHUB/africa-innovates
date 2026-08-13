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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      faq_items: {
        Row: {
          answer: string
          created_at: string
          id: string
          question: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer?: string
          created_at?: string
          id?: string
          question: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          question?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      participants: {
        Row: {
          bio: string
          created_at: string
          full_name: string
          id: string
          image_url: string
          is_active: boolean
          is_demo: boolean
          participant_code: string
          participant_tag: string
          sort_order: number
          specialization: string
          updated_at: string
          username: string
          voting_enabled: boolean
        }
        Insert: {
          bio?: string
          created_at?: string
          full_name: string
          id?: string
          image_url?: string
          is_active?: boolean
          is_demo?: boolean
          participant_code: string
          participant_tag: string
          sort_order?: number
          specialization?: string
          updated_at?: string
          username?: string
          voting_enabled?: boolean
        }
        Update: {
          bio?: string
          created_at?: string
          full_name?: string
          id?: string
          image_url?: string
          is_active?: boolean
          is_demo?: boolean
          participant_code?: string
          participant_tag?: string
          sort_order?: number
          specialization?: string
          updated_at?: string
          username?: string
          voting_enabled?: boolean
        }
        Relationships: []
      }
      schedule_items: {
        Row: {
          created_at: string
          day_label: string
          description: string
          facilitator: string
          id: string
          session_title: string
          sort_order: number
          time_label: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_label?: string
          description?: string
          facilitator?: string
          id?: string
          session_title?: string
          sort_order?: number
          time_label?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_label?: string
          description?: string
          facilitator?: string
          id?: string
          session_title?: string
          sort_order?: number
          time_label?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_config: {
        Row: {
          contact_email: string
          description: string
          duration: string
          event_date: string
          event_kicker: string
          event_title: string
          headline: string
          id: number
          livestream_url: string
          location: string
          organizers: string
          partners: string
          support_wallet: string
          telegram_url: string
          updated_at: string
          vote_price_zec: string
          voting_wallet: string
          x_url: string
          youtube_url: string
        }
        Insert: {
          contact_email?: string
          description?: string
          duration?: string
          event_date?: string
          event_kicker?: string
          event_title?: string
          headline?: string
          id?: number
          livestream_url?: string
          location?: string
          organizers?: string
          partners?: string
          support_wallet?: string
          telegram_url?: string
          updated_at?: string
          vote_price_zec?: string
          voting_wallet?: string
          x_url?: string
          youtube_url?: string
        }
        Update: {
          contact_email?: string
          description?: string
          duration?: string
          event_date?: string
          event_kicker?: string
          event_title?: string
          headline?: string
          id?: number
          livestream_url?: string
          location?: string
          organizers?: string
          partners?: string
          support_wallet?: string
          telegram_url?: string
          updated_at?: string
          vote_price_zec?: string
          voting_wallet?: string
          x_url?: string
          youtube_url?: string
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
          role: Database["public"]["Enums"]["app_role"]
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
      vote_submissions: {
        Row: {
          admin_notes: string
          claimed_amount_zec: string
          created_at: string
          id: string
          participant_id: string
          participant_tag: string
          status: Database["public"]["Enums"]["vote_status"]
          txid: string
          updated_at: string
          verified_at: string | null
          votes: number
          voting_day_id: string | null
        }
        Insert: {
          admin_notes?: string
          claimed_amount_zec?: string
          created_at?: string
          id?: string
          participant_id: string
          participant_tag: string
          status?: Database["public"]["Enums"]["vote_status"]
          txid: string
          updated_at?: string
          verified_at?: string | null
          votes?: number
          voting_day_id?: string | null
        }
        Update: {
          admin_notes?: string
          claimed_amount_zec?: string
          created_at?: string
          id?: string
          participant_id?: string
          participant_tag?: string
          status?: Database["public"]["Enums"]["vote_status"]
          txid?: string
          updated_at?: string
          verified_at?: string | null
          votes?: number
          voting_day_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vote_submissions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vote_submissions_voting_day_id_fkey"
            columns: ["voting_day_id"]
            isOneToOne: false
            referencedRelation: "voting_days"
            referencedColumns: ["id"]
          },
        ]
      }
      voting_days: {
        Row: {
          closes_at: string | null
          created_at: string
          day_number: number
          id: string
          is_open: boolean
          label: string
          opens_at: string | null
          updated_at: string
          vote_price_zec: string
        }
        Insert: {
          closes_at?: string | null
          created_at?: string
          day_number: number
          id?: string
          is_open?: boolean
          label?: string
          opens_at?: string | null
          updated_at?: string
          vote_price_zec?: string
        }
        Update: {
          closes_at?: string | null
          created_at?: string
          day_number?: number
          id?: string
          is_open?: boolean
          label?: string
          opens_at?: string | null
          updated_at?: string
          vote_price_zec?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_leaderboard: {
        Args: { _day_number?: number }
        Returns: {
          full_name: string
          image_url: string
          participant_code: string
          participant_id: string
          participant_tag: string
          verified_votes: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      submit_vote_transaction: {
        Args: { _amount?: string; _participant_id: string; _txid: string }
        Returns: Json
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      vote_status: "pending" | "verified" | "rejected" | "duplicate"
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
      app_role: ["admin", "moderator", "user"],
      vote_status: ["pending", "verified", "rejected", "duplicate"],
    },
  },
} as const
