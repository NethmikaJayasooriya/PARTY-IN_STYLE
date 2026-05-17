export async function getSettings() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) return null;
  
  try {
    // We use the Firestore REST API for Server Components to avoid client SDK issues
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/settings/content`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    
    const formatValue = (field) => {
      if (!field) return null;
      if (field.stringValue !== undefined) return field.stringValue;
      if (field.integerValue !== undefined) return field.integerValue;
      if (field.doubleValue !== undefined) return field.doubleValue;
      if (field.booleanValue !== undefined) return field.booleanValue;
      if (field.arrayValue !== undefined) {
        return (field.arrayValue.values || []).map(formatValue);
      }
      if (field.mapValue !== undefined) {
        const obj = {};
        for (const [k, v] of Object.entries(field.mapValue.fields || {})) {
          obj[k] = formatValue(v);
        }
        return obj;
      }
      return null;
    };
    
    const settings = {};
    if (data.fields) {
      for (const [key, value] of Object.entries(data.fields)) {
        settings[key] = formatValue(value);
      }
    }
    return settings;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
}
