import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { HexColorPicker } from "react-colorful";
import { Input } from "../components/ui/Input";
import Header from "../components/ui/Header";

interface ThemeProps {
  foreground: string;
  primary: string;
  accent: string;
}

interface ColorState {
  foreground: string;
  primary: string;
  accent: string;
}

type ColorKey = "foreground" | "primary" | "accent";

const colorVariables: ColorKey[] = ["foreground", "primary", "accent"];

const Preferences = () => {
  const [theme, setTheme] = useState<ThemeProps>({
    foreground: "",
    primary: "",
    accent: "",
  });
  const [color, setColor] = useState<ColorState>({
    foreground: "",
    primary: "",
    accent: "",
  });
  const [visibleColor, setVisibleColor] = useState<ColorKey | null>(null);

  const handleColorClick = (colorKey: ColorKey) => {
    setVisibleColor((prevColor) => (prevColor === colorKey ? null : colorKey));
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--foreground", theme.foreground);
    root.style.setProperty("--primary-foreground", theme.primary);
    root.style.setProperty("--accent", theme.accent);
  }, [theme]);

  const setThemeColor = () => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      foreground: color.foreground,
      primary: color.primary,
      accent: color.accent,
    }));
  };

  return (
    <div>
      <Header title="Elegir colores de preferencia" />

      <Button onClick={setThemeColor}>Cambiar color</Button>

      <div className="flex gap-6">
        {colorVariables.map((colorKey) => (
          <div key={colorKey} className="flex flex-col w-44 py-6 relative">
            <h3>{`Color ${
              colorKey === "foreground"
                ? "primario"
                : colorKey === "primary"
                ? "de texto"
                : "de acento"
            }:`}</h3>
            <div className="flex relative">
              <div
                className={`h-9 w-11 rounded-l-sm cursor-pointer border border-input`}
                style={{
                  backgroundColor:
                    color[colorKey] === ""
                      ? `#${
                          colorKey === "foreground"
                            ? "020817"
                            : colorKey === "primary"
                            ? "ffffff"
                            : "265df2"
                        }`
                      : color[colorKey],
                }}
                onClick={() => handleColorClick(colorKey)}
              />
              <Input
                type="text"
                className="rounded-l-none"
                value={color[colorKey]}
                onChange={(e) => setColor({ ...color, [colorKey]: e.target.value })}
                placeholder={`#${
                  colorKey === "foreground"
                    ? "020817"
                    : colorKey === "primary"
                    ? "ffffff"
                    : "265df2"
                }`}
              />
              <div
                className={`absolute top-[40px] ${
                  visibleColor !== colorKey ? "hidden" : ""
                }`}
              >
                <HexColorPicker
                  color={color[colorKey]}
                  onChange={(newColor) =>
                    setColor({ ...color, [colorKey]: newColor })
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preferences;
