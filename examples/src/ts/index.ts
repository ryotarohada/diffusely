import '../style/style.scss';
import Diffusely from "diffusely"

const optionsObject = {
    observation: true
}

const diffusely = new Diffusely(
    optionsObject
);

diffusely.createPathMap(['top', 'about', 'contact']);

diffusely.pathMap.top = (): void => {
    console.log('topページ');
}

diffusely.pathMap.about = (): void => {
    console.log('aboutページ');
}

diffusely.pathMap.contact = (): void => {
    console.log('contactページ');
}

diffusely.pathMap.common = () => {
    console.log('common function');
}

diffusely.start();