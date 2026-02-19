import { useState } from "react";
import Modal from "../components/Modal";
import AboutMeSection from "../components/AboutMeSection";

const PLAN_PDF = "/plan_trabajo/PlanDeTrabajoPS_ToledoAlvaro.pdf";
const ARQ_IMG = "/imagenes/arq_global.drawio.png";
const CLASSIFICATION_PROJECT_PDF = "/pdfs/PS_classification_project.pdf";
const SYNTHETIC_SALES_GENERATOR_PDF = "/pdfs/PS_Synthetic_sales_generator.pdf";
const VOLTAJE_ETL_PIPELINE_PDF = "/pdfs/PS_PipelineETL.pdf";
const INFORME_FINAL_PDF = "/pdfs/Informe_Final_PS_ToledoAlvaro.pdf";
const VOLTAJE_ITEMSET_WAREHOUSE_GITHUB_NB =
  "https://github.com/alvarotoledo01/itemset_warehouse_project/blob/main/notebooks/voltaje_mba_layout.ipynb";

// EDITÁ ESTA SECCIÓN (foto + links + texto) A TU GUSTO
const ABOUT_ME = {
  name: "Alvaro Julian Toledo",
  headline: "Ingeniería en Sistemas de Información (UTN FRT) — Práctica supervisada",
  photoSrc: "/imagenes/ToledoAlvaro.jpg",
  location: "San Miguel de Tucumán, Tucumán - Argentina",
  bioTitle: "Sobre mí",
  linkedinUrl: "https://www.linkedin.com/in/toledoalvaro/",
  email: "Alvaro.Toledo@alu.frt.utn.edu.ar",
  bio: [
    "Profesional con formación en Ingeniería en Sistemas de Información en la UTN FRT, próximo a recibirme. Me caracterizo por una sólida capacidad para la resolución de problemas complejos, pensamiento analítico y un enfoque orientado a resultados, lo que me permite abordar desafíos de manera estructurada y efectiva. Soy una persona comprometida con la innovación y la mejora continua, con una forma de trabajo alineada a las buenas prácticas, buscando siempre aportar valor y crecer profesionalmente en los entornos en los que participo.",
    "Finalicé mi práctica supervisada en Voltaje S.R.L., donde desarrollé un proyecto de diseño y optimización del depósito, integrando criterios operativos, categorización de productos y visualización para mejorar la organización y apoyar la toma de decisiones. En este contexto, implementé un sistema multiagente para la categorización de productos, un generador de ventas sintéticas para la simulación de escenarios y un pipeline ETL para el procesamiento y carga de datos en un Data Warehouse, utilizado posteriormente en análisis de data mining mediante algoritmos de reglas de asociación como Apriori, ECLAT y FP-Growth.",
  ],
};

export default function About() {
  const [open, setOpen] = useState(false);
  const [openArq, setOpenArq] = useState(false);
  const [openInformeFinal, setOpenInformeFinal] = useState(false);
  const [openClassificationPdf, setOpenClassificationPdf] = useState(false);
  const [openSyntheticSalesPdf, setOpenSyntheticSalesPdf] = useState(false);
  const [openVoltajeEtlPdf, setOpenVoltajeEtlPdf] = useState(false);
  const [openVoltajeItemsetNb, setOpenVoltajeItemsetNb] = useState(false);
  return (
    <section className="space-y-6">
      <AboutMeSection
        name={ABOUT_ME.name}
        headline={ABOUT_ME.headline}
        bioTitle={(ABOUT_ME as any).bioTitle}
        bio={ABOUT_ME.bio}
        photoSrc={ABOUT_ME.photoSrc}
        location={ABOUT_ME.location}
        linkedinUrl={(ABOUT_ME as any).linkedinUrl}
        email={(ABOUT_ME as any).email}
      />

      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Sobre el proyecto</h1>
        <p className="mt-1 text-sm text-slate-600">
          Página reservada para documentación y conclusiones.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl p-7 text-white shadow-sm transition
                   bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600
                   hover:from-sky-400 hover:via-blue-500 hover:to-indigo-500
                   focus:outline-none focus:ring-4 focus:ring-blue-200"
      >
        <div className="text-center">
          <div className="text-lg font-semibold tracking-tight">Plan de trabajo</div>
          <p className="mt-1 text-sm text-white/90">
            Abrir PDF (plan de trabajo).
          </p>
        </div>
      </button>

      <button
        type="button"
        onClick={() => setOpenArq(true)}
        className="w-full rounded-2xl p-7 text-white shadow-sm transition
                   bg-gradient-to-br from-emerald-500 via-green-600 to-lime-500
                   hover:from-emerald-400 hover:via-green-500 hover:to-lime-400
                   focus:outline-none focus:ring-4 focus:ring-emerald-200"
      >
        <div className="text-center">
          <div className="text-lg font-semibold tracking-tight">
            Arquitectura global de la solución
          </div>
          <p className="mt-1 text-sm text-white/90">Ver diagrama.</p>
        </div>
      </button>

      <button
        type="button"
        onClick={() => setOpenInformeFinal(true)}
        className="w-full rounded-2xl p-7 text-white shadow-sm transition
                   bg-gradient-to-br from-orange-400 via-amber-500 to-orange-600
                   hover:from-orange-300 hover:via-amber-400 hover:to-orange-500
                   focus:outline-none focus:ring-4 focus:ring-orange-200"
      >
        <div className="text-center">
          <div className="text-lg font-semibold tracking-tight">Informe final</div>
          <p className="mt-1 text-sm text-white/90">Abrir PDF (informe final).</p>
        </div>
      </button>

      <Modal isOpen={open} title="Plan de trabajo" onClose={() => setOpen(false)}>
        <div className="space-y-3">
          <div className="text-xs text-slate-500">
            Si el visor no carga, abrilo en otra pestaña:{" "}
            <a
              className="text-blue-700 hover:text-blue-900 underline"
              href={PLAN_PDF}
              target="_blank"
              rel="noreferrer"
            >
              abrir PDF
            </a>
            .
          </div>
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <iframe
              title="Plan de trabajo (PDF)"
              src={PLAN_PDF}
              className="w-full"
              style={{ height: "75vh" }}
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={openInformeFinal}
        title="Informe final"
        onClose={() => setOpenInformeFinal(false)}
      >
        <div className="space-y-3">
          <div className="text-xs text-slate-500">
            Si el visor no carga, abrilo en otra pestaña:{" "}
            <a
              className="text-blue-700 hover:text-blue-900 underline"
              href={INFORME_FINAL_PDF}
              target="_blank"
              rel="noreferrer"
            >
              abrir PDF
            </a>
            .
          </div>
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <iframe
              title="Informe final (PDF)"
              src={INFORME_FINAL_PDF}
              className="w-full"
              style={{ height: "75vh" }}
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={openArq}
        title="Arquitectura global de la solución"
        onClose={() => setOpenArq(false)}
      >
        <div className="space-y-3">
          <div className="text-xs text-slate-500">
            Si la imagen no carga, abrila en otra pestaña:{" "}
            <a
              className="text-blue-700 hover:text-blue-900 underline"
              href={ARQ_IMG}
              target="_blank"
              rel="noreferrer"
            >
              abrir imagen
            </a>
            .
          </div>
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
            <img
              src={ARQ_IMG}
              alt="Arquitectura global de la solución"
              className="w-full h-auto"
            />
          </div>

          <div className="pt-1 space-y-3">
            <div className="text-lg font-medium text-slate-800">
              📌 Proyecto: <span className="font-semibold">classification_project</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpenArq(false);
                setOpenClassificationPdf(true);
              }}
              className="w-full rounded-xl px-5 py-3 text-white shadow-sm transition
                         bg-gradient-to-br from-rose-500 via-red-600 to-orange-600
                         hover:from-rose-400 hover:via-red-500 hover:to-orange-500
                         focus:outline-none focus:ring-4 focus:ring-red-200"
            >
              <div className="text-center text-base font-semibold tracking-tight">
                Ver PDF
              </div>
            </button>
          </div>

          <div className="pt-1 space-y-3">
            <div className="text-lg font-medium text-slate-800">
              📌 Proyecto:{" "}
              <span className="font-semibold">Synthetic_Sales_Generator</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpenArq(false);
                setOpenSyntheticSalesPdf(true);
              }}
              className="w-full rounded-xl px-5 py-3 text-white shadow-sm transition
                         bg-gradient-to-br from-rose-500 via-red-600 to-orange-600
                         hover:from-rose-400 hover:via-red-500 hover:to-orange-500
                         focus:outline-none focus:ring-4 focus:ring-red-200"
            >
              <div className="text-center text-base font-semibold tracking-tight">
                Ver PDF
              </div>
            </button>
          </div>

          <div className="pt-1 space-y-3">
            <div className="text-lg font-medium text-slate-800">
              📌 Proyecto: <span className="font-semibold">Voltaje_ETL_Pipeline</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpenArq(false);
                setOpenVoltajeEtlPdf(true);
              }}
              className="w-full rounded-xl px-5 py-3 text-white shadow-sm transition
                         bg-gradient-to-br from-rose-500 via-red-600 to-orange-600
                         hover:from-rose-400 hover:via-red-500 hover:to-orange-500
                         focus:outline-none focus:ring-4 focus:ring-red-200"
            >
              <div className="text-center text-base font-semibold tracking-tight">
                Ver PDF
              </div>
            </button>
          </div>

          <div className="pt-1 space-y-3">
            <div className="text-lg font-medium text-slate-800">
              📌 Proyecto:{" "}
              <span className="font-semibold">voltaje_itemset_warehouse</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpenArq(false);
                setOpenVoltajeItemsetNb(true);
              }}
              className="w-full rounded-xl px-5 py-3 text-white shadow-sm transition
                         bg-gradient-to-br from-rose-500 via-red-600 to-orange-600
                         hover:from-rose-400 hover:via-red-500 hover:to-orange-500
                         focus:outline-none focus:ring-4 focus:ring-red-200"
            >
              <div className="text-center text-base font-semibold tracking-tight">
                Ver notebook
              </div>
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={openClassificationPdf}
        title="Proyecto: classification_project"
        onClose={() => setOpenClassificationPdf(false)}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setOpenClassificationPdf(false);
                setOpenArq(true);
              }}
              className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition border border-slate-200"
            >
              Volver
            </button>

            <a
              className="text-xs text-blue-700 hover:text-blue-900 underline"
              href={CLASSIFICATION_PROJECT_PDF}
              target="_blank"
              rel="noreferrer"
            >
              Abrir PDF en otra pestaña
            </a>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <iframe
              title="PS_classification_project (PDF)"
              src={CLASSIFICATION_PROJECT_PDF}
              className="w-full"
              style={{ height: "75vh" }}
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={openSyntheticSalesPdf}
        title="Proyecto: Synthetic_Sales_Generator"
        onClose={() => setOpenSyntheticSalesPdf(false)}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setOpenSyntheticSalesPdf(false);
                setOpenArq(true);
              }}
              className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition border border-slate-200"
            >
              Volver
            </button>

            <a
              className="text-xs text-blue-700 hover:text-blue-900 underline"
              href={SYNTHETIC_SALES_GENERATOR_PDF}
              target="_blank"
              rel="noreferrer"
            >
              Abrir PDF en otra pestaña
            </a>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <iframe
              title="PS_Synthetic_sales_generator (PDF)"
              src={SYNTHETIC_SALES_GENERATOR_PDF}
              className="w-full"
              style={{ height: "75vh" }}
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={openVoltajeEtlPdf}
        title="Proyecto: Voltaje_ETL_Pipeline"
        onClose={() => setOpenVoltajeEtlPdf(false)}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setOpenVoltajeEtlPdf(false);
                setOpenArq(true);
              }}
              className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition border border-slate-200"
            >
              Volver
            </button>

            <a
              className="text-xs text-blue-700 hover:text-blue-900 underline"
              href={VOLTAJE_ETL_PIPELINE_PDF}
              target="_blank"
              rel="noreferrer"
            >
              Abrir PDF en otra pestaña
            </a>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <iframe
              title="PS_PipelineETL (PDF)"
              src={VOLTAJE_ETL_PIPELINE_PDF}
              className="w-full"
              style={{ height: "75vh" }}
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={openVoltajeItemsetNb}
        title="Proyecto: voltaje_itemset_warehouse (Notebook)"
        onClose={() => setOpenVoltajeItemsetNb(false)}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setOpenVoltajeItemsetNb(false);
                setOpenArq(true);
              }}
              className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition border border-slate-200"
            >
              Volver
            </button>

            <a
              className="text-xs text-blue-700 hover:text-blue-900 underline"
              href={VOLTAJE_ITEMSET_WAREHOUSE_GITHUB_NB}
              target="_blank"
              rel="noreferrer"
            >
              Abrir en GitHub
            </a>
          </div>

          <div className="text-xs text-slate-500">
            Si GitHub bloquea el embed, usá el link de arriba para abrirlo en otra pestaña.
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <iframe
              title="Notebook (GitHub)"
              src={VOLTAJE_ITEMSET_WAREHOUSE_GITHUB_NB}
              className="w-full"
              style={{ height: "75vh" }}
            />
          </div>
        </div>
      </Modal>
    </section>
  );
}

