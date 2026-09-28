import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";
import { height } from "../anim";
import Body from "./body/body";
import NavImage from "./image/image";

import { links as allLinks } from "@/components/header/config";
import { cn } from "@/lib/utils";

interface IndexProps {
  setIsActive: (isActive: boolean) => void;
  showBlog?: boolean;
}

interface SelectedLinkState {
  isActive: boolean;
  index: number;
}

const Index: React.FC<IndexProps> = ({ setIsActive, showBlog = false }) => {
  const links = showBlog ? allLinks : allLinks.filter((l) => l.href !== "/blog");
  const [selectedLink, setSelectedLink] = useState<SelectedLinkState>({
    isActive: false,
    index: 0,
  });

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.nav}
    >
      <div className={cn(styles.wrapper, 'flex justify-end sm:justify-start')}>
        <div className={styles.container}>
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            setIsActive={setIsActive}
          />
        </div>
        <NavImage
          src={links[selectedLink.index].thumbnail}
          isActive={selectedLink.isActive}
        />
      </div>
    </motion.div>
  );
};

export default Index;
