import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { Crosshair } from "lucide-react";

type Props = { latitude: number; longitude: number; precisao: number | null };

export function Mapa({ latitude, longitude, precisao }: Props) {
  const elemento = useRef<HTMLDivElement>(null);
  const mapa = useRef<L.Map | null>(null);
  const ponto = useRef<L.CircleMarker | null>(null);
  const halo = useRef<L.CircleMarker | null>(null);
  const circulo = useRef<L.Circle | null>(null);
  const seguindoRef = useRef(true);
  const [seguindo, setSeguindo] = useState(true);

  useEffect(() => {
    if (!elemento.current || mapa.current) return;
    const m = L.map(elemento.current, { zoomControl: false }).setView([latitude, longitude], 16);
    L.control.zoom({ zoomInTitle: "Aproximar", zoomOutTitle: "Afastar" }).addTo(m);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      crossOrigin: "anonymous",
      referrerPolicy: "origin",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(m);
    m.attributionControl.setPrefix(false);

    circulo.current = L.circle([latitude, longitude], {
      radius: precisao ?? 0,
      color: "#2F5D62",
      weight: 1.5,
      fillColor: "#2F5D62",
      fillOpacity: 0.12,
    }).addTo(m);

    halo.current = L.circleMarker([latitude, longitude], {
      radius: 18,
      color: "transparent",
      fillColor: "#7A2E3A",
      fillOpacity: 0.22,
      interactive: false,
    }).addTo(m);

    ponto.current = L.circleMarker([latitude, longitude], {
      radius: 9,
      color: "#FFFFFF",
      weight: 3,
      fillColor: "#7A2E3A",
      fillOpacity: 1,
    }).addTo(m);

    m.on("dragstart", () => {
      seguindoRef.current = false;
      setSeguindo(false);
    });

    mapa.current = m;
    return () => {
      m.remove();
      mapa.current = null;
    };
  }, []);

  useEffect(() => {
    const pos: L.LatLngExpression = [latitude, longitude];
    ponto.current?.setLatLng(pos);
    halo.current?.setLatLng(pos);
    circulo.current?.setLatLng(pos).setRadius(precisao ?? 0);
    if (seguindoRef.current) {
      mapa.current?.panTo(pos, { animate: true });
    }
  }, [latitude, longitude, precisao]);

  const centralizar = () => {
    seguindoRef.current = true;
    setSeguindo(true);
    mapa.current?.setView([latitude, longitude], Math.max(mapa.current.getZoom(), 16), { animate: true });
  };

  return (
    <div className="mapa-quadro">
      <div ref={elemento} className="mapa" role="region" aria-label="Mapa com a localização compartilhada" />
      {!seguindo && (
        <button type="button" className="mapa__centralizar" onClick={centralizar}>
          <Crosshair size={16} aria-hidden="true" />
          Centralizar
        </button>
      )}
    </div>
  );
}
