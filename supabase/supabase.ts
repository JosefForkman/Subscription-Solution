export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      category: {
        Row: {
          category_id: number
          type: string
        }
        Insert: {
          category_id?: number
          type: string
        }
        Update: {
          category_id?: number
          type?: string
        }
        Relationships: []
      }
      price_history: {
        Row: {
          date: string
          price: number
          price_history_id: number
          serevice_id: number | null
        }
        Insert: {
          date: string
          price: number
          price_history_id?: number
          serevice_id?: number | null
        }
        Update: {
          date?: string
          price?: number
          price_history_id?: number
          serevice_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "price_history_serevice_id_fkey"
            columns: ["serevice_id"]
            referencedRelation: "service"
            referencedColumns: ["service_id"]
          }
        ]
      }
      service: {
        Row: {
          category_id: number | null
          defualt_price: number
          img_path: string | null
          name: string
          service_id: number
          termination_url: string
        }
        Insert: {
          category_id?: number | null
          defualt_price: number
          img_path?: string | null
          name: string
          service_id?: number
          termination_url: string
        }
        Update: {
          category_id?: number | null
          defualt_price?: number
          img_path?: string | null
          name?: string
          service_id?: number
          termination_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "category"
            referencedColumns: ["category_id"]
          }
        ]
      }
      user_service: {
        Row: {
          enterd_price: number | null
          service_id: number
          sign_up_date: string
          termination_date: string
          user_id: string
          user_service_id: number
        }
        Insert: {
          enterd_price?: number | null
          service_id: number
          sign_up_date: string
          termination_date: string
          user_id: string
          user_service_id?: number
        }
        Update: {
          enterd_price?: number | null
          service_id?: number
          sign_up_date?: string
          termination_date?: string
          user_id?: string
          user_service_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_service_service_id_fkey"
            columns: ["service_id"]
            referencedRelation: "service"
            referencedColumns: ["service_id"]
          },
          {
            foreignKeyName: "user_service_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
