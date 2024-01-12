interface Multa {
    iCodMulta: number
    iCodEmpresa: number
    iCodTipoCepo: number
    gCoordenadasXMulta: number
    gCoordenadasYMulta: number
    vDireccionMulta: string
    vConceptoMulta: string
    vTarjetaPropiedad: string
    vLicenciaConducir: string
    vPlacaAuto: string
    vMarcaAuto: string
    vModeloAuto: string
    vColorAuto: string
    iNumeroLlantas: number
    vCodigoPreliquidacion: string
    dFechaPago?: Date | string | null
    iCodUsuarioBloqueo?: number | null
    dtFechaBloqueo?: Date | string | null
    iCodUsuarioDesbloqueo?: number | null
    dtFechaDesbloqueo?: Date | null
    bEstadoRegistro: boolean
    iCodigoUsuarioCreacion: number
    dtFechaCreacion: Date | string 
    iCodigoUsuarioModificacion?: number | null
    dtFechaModificacion?: Date | null
    empresa: Empresa
    tipocepo: Tipocepo
    usuariobloqueo?: Usuario | null
    usuariodesbloqueo?: Usuario | null
  }
  
  interface Empresa {
    iCodEmpresa: number
    vNombreEmpresa: string
    bEstadoRegistro: boolean
    iCodigoUsuarioCreacion: number
    dtFechaCreacion: Date
    iCodigoUsuarioModificacion?: number | null
    dtFechaModificacion?: Date | null
    perfiles?: Perfil[]
    usuarios?: Usuario[]
  }
  
  interface Usuario {
    iCodUsuario: number
    iCodPerfil: number
    iCodEmpresa: number
    vAliasUsuario: string
    vClaveUsuario: string
    dtFechaVencimiento?: Date | null
    bEstadoRegistro: boolean
    iCodigoUsuarioCreacion: number
    dtFechaCreacion: Date
    iCodigoUsuarioModificacion?: number | null
    dtFechaModificacion?: Date | null
    empresa: Empresa
    perfil: Perfil
    multaUsuarioBloqueo?: Multa[]
    multaUsuarioDesbloqueo?: Multa[]
  }
  
  interface Perfil {
    iCodPerfil: number
    iCodEmpresa: number
    vDescripcionPerfil: string
    bEstadoRegistro: boolean
    iCodigoUsuarioCreacion: number
    dtFechaCreacion: Date
    iCodigoUsuarioModificacion?: number | null
    dtFechaModificacion?: Date | null
    empresa: Empresa
    usuarios?: Usuario[]
  }
  
  interface Tipocepo {
    iCodTipoCepo: number
    iCodEmpresa: number
    vDescripcionCepo: string
    vCostoCepo: number
    bEstadoRegistro: boolean
    iCodigoUsuarioCreacion: number
    dtFechaCreacion: Date
    iCodigoUsuarioModificacion?: number | null
    dtFechaModificacion?: Date | null
    empresa: Empresa
    multas?: Multa[]
  }

type geoCode = [number, number]