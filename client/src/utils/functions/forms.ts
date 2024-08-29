import { showToast } from "@/utils/functions/showToast";
import { NavigateFunction } from "react-router-dom";
import IconCheck from "@/assets/images/icons/check.svg";
import { navigateWithViewTransition } from "@/utils/functions/navigate";

type Inputs = {
  email: string;
  password: string;
};

export const loginSubmitHandler = async (
  data: Inputs,
  navigate: NavigateFunction
) => {
  try {
    const result = await fetch(
      `${import.meta.env.VITE_API_URL}/public/index.php?action=login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const response = await result.json();

    if (result.ok) {
      localStorage.setItem("token", response.data.token);
      showToast({
        message: response.message,
        type: "success",
        icon: IconCheck,
      });
      setTimeout(() => {
        navigateWithViewTransition(navigate, "/perfil");
      }, 3000);
    } else {
      showToast({ message: response.message, type: "error" });
    }
  } catch (error) {
    console.error("Error en el login:", error);
    showToast({ message: "Ocurrió un error inesperado", type: "error" });
  }
};
