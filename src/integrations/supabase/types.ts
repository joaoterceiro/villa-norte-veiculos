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
      cookie_policy: {
        Row: {
          categories: Json
          content: Json
          id: string
          is_active: boolean | null
          last_updated: string | null
          published_at: string | null
          version: string
        }
        Insert: {
          categories?: Json
          content: Json
          id?: string
          is_active?: boolean | null
          last_updated?: string | null
          published_at?: string | null
          version: string
        }
        Update: {
          categories?: Json
          content?: Json
          id?: string
          is_active?: boolean | null
          last_updated?: string | null
          published_at?: string | null
          version?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          carro_troca: boolean | null
          cnh: boolean | null
          cpf: string | null
          data_cadastro: string | null
          data_nascimento: string | null
          lead_id: string
          nome: string
          observacao: string | null
          status: string | null
          telefone: string
          valor_entrada: number | null
        }
        Insert: {
          carro_troca?: boolean | null
          cnh?: boolean | null
          cpf?: string | null
          data_cadastro?: string | null
          data_nascimento?: string | null
          lead_id?: string
          nome: string
          observacao?: string | null
          status?: string | null
          telefone: string
          valor_entrada?: number | null
        }
        Update: {
          carro_troca?: boolean | null
          cnh?: boolean | null
          cpf?: string | null
          data_cadastro?: string | null
          data_nascimento?: string | null
          lead_id?: string
          nome?: string
          observacao?: string | null
          status?: string | null
          telefone?: string
          valor_entrada?: number | null
        }
        Relationships: []
      }
      portal_settings: {
        Row: {
          address: string | null
          body_type_icons: Json[] | null
          brand_logos: Json[] | null
          created_at: string | null
          email: string | null
          facebook_url: string | null
          id: string
          instagram_url: string | null
          phone: string | null
          updated_at: string | null
          whatsapp_number: string
          youtube_url: string | null
        }
        Insert: {
          address?: string | null
          body_type_icons?: Json[] | null
          brand_logos?: Json[] | null
          created_at?: string | null
          email?: string | null
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          phone?: string | null
          updated_at?: string | null
          whatsapp_number: string
          youtube_url?: string | null
        }
        Update: {
          address?: string | null
          body_type_icons?: Json[] | null
          brand_logos?: Json[] | null
          created_at?: string | null
          email?: string | null
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          phone?: string | null
          updated_at?: string | null
          whatsapp_number?: string
          youtube_url?: string | null
        }
        Relationships: []
      }
      product: {
        Row: {
          base_model: string | null
          body_type: string | null
          category: string | null
          chassis: string | null
          color: string | null
          condition: string | null
          date_added: string
          deleted_at: string | null
          description: string | null
          doors: number | null
          download: string | null
          engine: string | null
          external_id: number
          fipe_code: string | null
          fipe_value: number | null
          fuel_type: string | null
          horsepower: number | null
          image_feature: string | null
          inspection_report: string | null
          is_featured: boolean | null
          last_update: string | null
          make: string | null
          manufacture_year: number | null
          mileage: number | null
          model: string | null
          plate: string | null
          price: number | null
          promotion_price: number | null
          status: string | null
          title: string
          transmission: string | null
          vehicle_id: string
          year: number | null
        }
        Insert: {
          base_model?: string | null
          body_type?: string | null
          category?: string | null
          chassis?: string | null
          color?: string | null
          condition?: string | null
          date_added: string
          deleted_at?: string | null
          description?: string | null
          doors?: number | null
          download?: string | null
          engine?: string | null
          external_id: number
          fipe_code?: string | null
          fipe_value?: number | null
          fuel_type?: string | null
          horsepower?: number | null
          image_feature?: string | null
          inspection_report?: string | null
          is_featured?: boolean | null
          last_update?: string | null
          make?: string | null
          manufacture_year?: number | null
          mileage?: number | null
          model?: string | null
          plate?: string | null
          price?: number | null
          promotion_price?: number | null
          status?: string | null
          title: string
          transmission?: string | null
          vehicle_id?: string
          year?: number | null
        }
        Update: {
          base_model?: string | null
          body_type?: string | null
          category?: string | null
          chassis?: string | null
          color?: string | null
          condition?: string | null
          date_added?: string
          deleted_at?: string | null
          description?: string | null
          doors?: number | null
          download?: string | null
          engine?: string | null
          external_id?: number
          fipe_code?: string | null
          fipe_value?: number | null
          fuel_type?: string | null
          horsepower?: number | null
          image_feature?: string | null
          inspection_report?: string | null
          is_featured?: boolean | null
          last_update?: string | null
          make?: string | null
          manufacture_year?: number | null
          mileage?: number | null
          model?: string | null
          plate?: string | null
          price?: number | null
          promotion_price?: number | null
          status?: string | null
          title?: string
          transmission?: string | null
          vehicle_id?: string
          year?: number | null
        }
        Relationships: []
      }
      product_accessories: {
        Row: {
          accessory: string
          vehicle_id: string
        }
        Insert: {
          accessory: string
          vehicle_id: string
        }
        Update: {
          accessory?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_accessories_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["vehicle_id"]
          },
          {
            foreignKeyName: "product_accessories_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicle_details"
            referencedColumns: ["vehicle_id"]
          },
        ]
      }
      product_images: {
        Row: {
          image_id: string
          image_url: string | null
          image_url_large: string | null
          vehicle_id: string | null
        }
        Insert: {
          image_id?: string
          image_url?: string | null
          image_url_large?: string | null
          vehicle_id?: string | null
        }
        Update: {
          image_id?: string
          image_url?: string | null
          image_url_large?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_images_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["vehicle_id"]
          },
          {
            foreignKeyName: "product_images_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicle_details"
            referencedColumns: ["vehicle_id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      slides: {
        Row: {
          alt_text: string | null
          created_at: string | null
          desktop_image_url: string
          display_order: number | null
          id: string
          is_active: boolean | null
          link: string | null
          mobile_image_url: string
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          desktop_image_url: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          link?: string | null
          mobile_image_url: string
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          desktop_image_url?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          link?: string | null
          mobile_image_url?: string
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      top_banners: {
        Row: {
          created_at: string | null
          desktop_image_url: string
          id: string
          is_active: boolean | null
          link: string | null
          mobile_image_url: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          desktop_image_url: string
          id?: string
          is_active?: boolean | null
          link?: string | null
          mobile_image_url: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          desktop_image_url?: string
          id?: string
          is_active?: boolean | null
          link?: string | null
          mobile_image_url?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      users_sis: {
        Row: {
          cnpj: string | null
          created_at: string | null
          deleted_at: string | null
          email: string
          name: string
          password_hash: string
          phone: string | null
          role: string
          updated_at: string | null
          user_id: string
          username: string
        }
        Insert: {
          cnpj?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email: string
          name: string
          password_hash: string
          phone?: string | null
          role: string
          updated_at?: string | null
          user_id: string
          username: string
        }
        Update: {
          cnpj?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string
          name?: string
          password_hash?: string
          phone?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      vehicle_count: {
        Row: {
          total_vehicles: number | null
        }
        Relationships: []
      }
      vehicle_details: {
        Row: {
          accessories: string[] | null
          body_type: string | null
          color: string | null
          condition: string | null
          external_id: number | null
          fuel_type: string | null
          image_feature: string | null
          is_featured: boolean | null
          make: string | null
          mileage: number | null
          model: string | null
          price: number | null
          status: string | null
          title: string | null
          transmission: string | null
          vehicle_id: string | null
          year: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      filter_products:
        | {
            Args: {
              p_search_term?: string
              p_marca?: string
              p_ano_min?: string
              p_price_min?: number
              p_price_max?: number
              p_mileage_min?: number
              p_mileage_max?: number
              p_transmission_type?: string
              p_fuel_type?: string
              p_body_type?: string
            }
            Returns: {
              vehicle_id: string
              external_id: number
              title: string
              make: string
              model: string
              year: number
              price: number
              mileage: number
              fuel_type: string
              transmission: string
              body_type: string
              color: string
              condition: string
              is_featured: boolean
              status: string
              image_feature: string
              accessories: string[]
            }[]
          }
        | {
            Args: {
              p_search_term?: string
              p_marca?: string
              p_ano_min?: string
              p_price_min?: number
              p_price_max?: number
              p_mileage_min?: number
              p_mileage_max?: number
              p_transmission_type?: string
              p_fuel_type?: string
              p_body_type?: string
              p_color?: string
            }
            Returns: {
              vehicle_id: string
              external_id: number
              title: string
              make: string
              model: string
              year: number
              price: number
              mileage: number
              fuel_type: string
              transmission: string
              body_type: string
              color: string
              condition: string
              is_featured: boolean
              status: string
              image_feature: string
              accessories: string[]
            }[]
          }
      filtered_products: {
        Args: {
          _make: string
          _year_start: number
          _year_end: number
          _price_min: number
          _price_max: number
          _mileage_min: number
          _mileage_max: number
          _transmission: string
        }
        Returns: {
          base_model: string | null
          body_type: string | null
          category: string | null
          chassis: string | null
          color: string | null
          condition: string | null
          date_added: string
          deleted_at: string | null
          description: string | null
          doors: number | null
          download: string | null
          engine: string | null
          external_id: number
          fipe_code: string | null
          fipe_value: number | null
          fuel_type: string | null
          horsepower: number | null
          image_feature: string | null
          inspection_report: string | null
          is_featured: boolean | null
          last_update: string | null
          make: string | null
          manufacture_year: number | null
          mileage: number | null
          model: string | null
          plate: string | null
          price: number | null
          promotion_price: number | null
          status: string | null
          title: string
          transmission: string | null
          vehicle_id: string
          year: number | null
        }[]
      }
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: string[]
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
