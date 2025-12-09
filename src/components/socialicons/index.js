import React from "react";
import "./style.css";
import { FaLinkedin, FaInstagram, FaCircle } from "react-icons/fa";
import { socialprofils } from "../../config/siteContent";

const ICON_MAPPING = {
  default: FaCircle,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
};

export const Socialicons = (params) => {
  return (
    <div className="stick_follow_icon">
      <ul>
        {Object.entries(socialprofils).map(([platform, url]) => {
          const IconComponent = ICON_MAPPING[platform] || ICON_MAPPING.default;
          return (
            <li key={platform}>
              <a href={url} target="_blank" rel="noreferrer">
                <IconComponent />
              </a>
            </li>
          );
        })}
      </ul>
      <p>Suivez-moi</p>
    </div>
  );
};
