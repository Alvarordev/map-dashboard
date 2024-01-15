import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { HexColorPicker } from "react-colorful";
import { Input } from "../components/ui/Input";

interface ThemeProps {
  background: string;
  foreground: string;
  primary: string;
  accent: string;
}

const Preferences = () => {
  const [theme, setTheme] = useState<ThemeProps>({
    background: "",
    foreground: "",
    primary: "",
    accent: "",
  });
  const [color, setColor] = useState({
    background: "",
    foreground: "",
    primary: "",
    accent: "",
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background",
      theme.background
    );

    document.documentElement.style.setProperty(
      "--foreground",
      theme.foreground
    );

    document.documentElement.style.setProperty(
      "--primary-foreground",
      theme.primary
    );

    document.documentElement.style.setProperty(
      "--accent",
      theme.accent
    );
  }, [theme]);

  const setThemeColor = () => {
    setTheme({
      ...theme,
      background: color.background,
      foreground: color.foreground,
      primary: color.primary,
      accent: color.accent
    });
  };

  console.log(color);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-10">
        Elegir colores de preferencia
      </h2>
      <Button onClick={setThemeColor}>Cambiar color</Button>

      <div className="flex gap-6">
        <div className="flex flex-col w-44 py-6 relative">
          <h3>Color principal:</h3>
          <div className="flex relative">
            <div
              className={`h-9 w-11 rounded-l-sm cursor-pointer border border-input`}
              style={{
                backgroundColor:
                  color.background === "" ? "#ffffff" : color.background,
              }}
              onClick={() => setVisible(!visible)}
            />
            <Input
              type="text"
              className="rounded-l-none"
              value={color.background}
              placeholder="#ffffff"
            />
            <div className={`absolute top-[40px] ${!visible ? "hidden" : ""}`}>
              <HexColorPicker
                color={color.background}
                onChange={(newColor) =>
                  setColor({ ...color, background: newColor })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-44 py-6 relative">
          <h3>Color secundario:</h3>
          <div className="flex relative">
            <div
              className={`h-9 w-11 rounded-l-sm cursor-pointer border border-input`}
              style={{
                backgroundColor:
                  color.foreground === "" ? "black" : color.foreground,
              }}
              onClick={() => setVisible(!visible)}
            />
            <Input
              type="text"
              className="rounded-l-none"
              value={color.foreground}
              placeholder="#020817"
            />
            <div className={`absolute top-[40px] ${!visible ? "hidden" : ""}`}>
              <HexColorPicker
                color={color.foreground}
                onChange={(newColor) =>
                  setColor({ ...color, foreground: newColor })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-44 py-6 relative">
          <h3>Color texto:</h3>
          <div className="flex relative">
            <div
              className={`h-9 w-11 rounded-l-sm cursor-pointer border border-input`}
              style={{
                backgroundColor: color.primary === "" ? "black" : color.primary,
              }}
              onClick={() => setVisible(!visible)}
            />
            <Input
              type="text"
              className="rounded-l-none"
              value={color.primary}
              placeholder="#020817"
            />
            <div className={`absolute top-[40px] ${!visible ? "hidden" : ""}`}>
              <HexColorPicker
                color={color.primary}
                onChange={(newColor) =>
                  setColor({ ...color, primary: newColor })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-44 py-6 relative">
          <h3>Color accent:</h3>
          <div className="flex relative">
            <div
              className={`h-9 w-11 rounded-l-sm cursor-pointer border border-input`}
              style={{
                backgroundColor: color.accent === "" ? "#265df2" : color.accent,
              }}
              onClick={() => setVisible(!visible)}
            />
            <Input
              type="text"
              className="rounded-l-none"
              value={color.accent}
              placeholder="#265df2"
            />
            <div className={`absolute top-[40px] ${!visible ? "hidden" : ""}`}>
              <HexColorPicker
                color={color.accent}
                onChange={(newColor) =>
                  setColor({ ...color, accent: newColor })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
