# 🛡️ PhishPal – Anti-Phishing Browser Extension

PhishPal es una extensión para navegadores diseñada para ayudarte a detectar enlaces potencialmente maliciosos **antes de que hagas clic**. Ideal para quienes quieren una navegación más segura sin esfuerzo.

## 🚀 ¿Cómo funciona?

- Detecta cuando el usuario pasa el ratón sobre un enlace.
- Analiza ese enlace en tiempo real usando la API pública de **VirusTotal**.
- Muestra un icono junto al enlace con una alerta:
  - 🟢 Seguro
  - 🟡 Sospechoso
  - 🔴 Peligroso
- Si el usuario mantiene el ratón sobre el icono, se muestra una explicación del estado.

## 🔧 Características

- ✔️ Análisis automático de enlaces en tiempo real  
- ✔️ Caching local para mejorar el rendimiento (con `localStorage`)  
- ✔️ UI simple y discreta con tooltips visuales  
- ✔️ Protección ligera y sin fricción  
- ✔️ Código abierto bajo licencia MIT  

## 📦 Instalación manual (modo desarrollador)

1. Clona o descarga este repositorio.
2. Abre `chrome://extensions/` en tu navegador Chrome.
3. Activa el **modo de desarrollador** (arriba a la derecha).
4. Haz clic en **“Cargar descomprimida”** y selecciona la carpeta del proyecto.

## 🔑 API Key de VirusTotal

Necesitas una API Key gratuita de [https://www.virustotal.com](https://www.virustotal.com).  
Pega tu clave en el archivo `background.js` donde se indica.

> ⚠️ **Importante:** No compartas claves privadas en entornos públicos.

## 🌐 Política de Privacidad

[Consulta aquí la política de privacidad](https://tiagopf2.github.io/PhishPal/privacy.html)

## 📝 Licencia

Este proyecto está licenciado bajo los términos de la [MIT License](LICENSE.txt).

---

Desarrollado por **Tiago Perez** · 2025
