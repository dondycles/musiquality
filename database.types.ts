export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      arranger_followers: {
        Row: {
          arranger_id: string
          created_at: string
          id: string
          user: string
        }
        Insert: {
          arranger_id: string
          created_at?: string
          id?: string
          user?: string
        }
        Update: {
          arranger_id?: string
          created_at?: string
          id?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "arranger_followers_arranger_id_fkey"
            columns: ["arranger_id"]
            isOneToOne: false
            referencedRelation: "arranger_metadata"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "arranger_followers_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      arranger_metadata: {
        Row: {
          avatar_url: string | null
          description: string | null
          display_name: string
          id: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          description?: string | null
          display_name: string
          id?: string
          user_id?: string
        }
        Update: {
          avatar_url?: string | null
          description?: string | null
          display_name?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "arranger_metadata_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      library: {
        Row: {
          created_at: string
          id: number
          payment_intent: string | null
          sheet: number | null
          user: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          payment_intent?: string | null
          sheet?: number | null
          user?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          payment_intent?: string | null
          sheet?: number | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "library_payment_intent_fkey"
            columns: ["payment_intent"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["payment_intent_id"]
          },
          {
            foreignKeyName: "library_sheet_fkey"
            columns: ["sheet"]
            isOneToOne: false
            referencedRelation: "sheets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "library_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sheets: {
        Row: {
          arranger_id: string
          created_at: string
          difficulty: string
          id: number
          instruments_array: string[]
          og_artists_array: string[]
          price: number
          thumbnail_url: string
          title: string
          with_chords: boolean
          with_lyrics: boolean
        }
        Insert: {
          arranger_id?: string
          created_at?: string
          difficulty: string
          id?: number
          instruments_array: string[]
          og_artists_array: string[]
          price?: number
          thumbnail_url: string
          title: string
          with_chords: boolean
          with_lyrics: boolean
        }
        Update: {
          arranger_id?: string
          created_at?: string
          difficulty?: string
          id?: number
          instruments_array?: string[]
          og_artists_array?: string[]
          price?: number
          thumbnail_url?: string
          title?: string
          with_chords?: boolean
          with_lyrics?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "sheets_arranger_metadata_fkey"
            columns: ["arranger_id"]
            isOneToOne: false
            referencedRelation: "arranger_metadata"
            referencedColumns: ["user_id"]
          },
        ]
      }
      sheets_url: {
        Row: {
          created_at: string
          sheet: number
          url: string
        }
        Insert: {
          created_at?: string
          sheet: number
          url: string
        }
        Update: {
          created_at?: string
          sheet?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "sheets_url_sheet_fkey"
            columns: ["sheet"]
            isOneToOne: true
            referencedRelation: "sheets"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          created_at: string
          id: string
          metadata: Json
          payment_intent_id: string
          price: number
          status: string | null
          user: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          metadata: Json
          payment_intent_id: string
          price?: number
          status?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json
          payment_intent_id?: string
          price?: number
          status?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          is_applying: boolean
          is_arranger: boolean
          name: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id?: string
          is_applying?: boolean
          is_arranger?: boolean
          name?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          is_applying?: boolean
          is_arranger?: boolean
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      search_sheets: {
        Args: {
          search_text: string
        }
        Returns: {
          arranger_id: string
          created_at: string
          difficulty: string
          id: number
          instruments_array: string[]
          og_artists_array: string[]
          price: number
          thumbnail_url: string
          title: string
          with_chords: boolean
          with_lyrics: boolean
        }[]
      }
      search_sheets_by_term: {
        Args: {
          search_text: string
        }
        Returns: number[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
