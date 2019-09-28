import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Activity} from './types';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    constructor() {
    }

    getActivity(eventID: number): Observable<Activity> {
        return this.getMultipleActivities().pipe(map(val => val.find(act => act.event_id === eventID)));
    }

    getMultipleActivities(): Observable<Activity[]> {

        const ACTIVITIES = [{
            event_id: 2014423,
            date: '2019-09-27',
            start_time: '19:00:00.0',
            end_time: null,
            title_de: ' Supermoto Ried Muotathal SZ',
            title_en: ' Supermoto Ried Muotathal SZ',
            title_fr: ' Supermoto Ried Muotathal SZ',
            title_it: ' Supermoto Ried Muotathal SZ',
            short_description_de: 'Die noch ausstehende Bewilligung des Kantons ist eingetroffen, so dass das Supermoto Ried Muotathal nun definitiv stattfinden kann. ',
            short_description_en: 'The still outstanding permit of the canton has arrived, so that the Supermoto Ried Muotathal can now definitely take place. ',
            short_description_fr: 'Die noch ausstehende Bewilligung des Kantons ist eingetroffen, so dass das Supermoto Ried Muotathal nun definitiv stattfinden kann. ',
            short_description_it: 'Die noch ausstehende Bewilligung des Kantons ist eingetroffen, so dass das Supermoto Ried Muotathal nun definitiv stattfinden kann. ',
            long_description_de: 'Wie angekündigt, hat sich die SAM-Sportkommission nach der Absage des Supermoto Ramsen an die Arbeit gemacht, um eine Ersatzveranstaltung auf die Beine zu stellen. Dem Sport-Vizepräsidenten Sandro Micheletto und seinem Team ist es gelungen, in Ried Muotathal ein geeignetes Gelände zu finden. Die Landbesitzer und Mieter, sowie die Behörden von Gemeinde und Kanton konnten überzeugt werden, dem Anlass die Bewilligung zu erteilen. ',
            long_description_en: 'As announced, following the cancellation of the Supermoto Ramsen, the SAM Sports Commission set to work to set up an alternative event. Sport Vice-President Sandro Micheletto and his team succeeded in finding a suitable site in Ried Muotathal. The landowners and tenants, as well as the authorities of the municipality and canton were convinced to grant permission for the event. ',
            long_description_fr: 'Wie angekündigt, hat sich die SAM-Sportkommission nach der Absage des Supermoto Ramsen an die Arbeit gemacht, um eine Ersatzveranstaltung auf die Beine zu stellen. Dem Sport-Vizepräsidenten Sandro Micheletto und seinem Team ist es gelungen, in Ried Muotathal ein geeignetes Gelände zu finden. Die Landbesitzer und Mieter, sowie die Behörden von Gemeinde und Kanton konnten überzeugt werden, dem Anlass die Bewilligung zu erteilen. ',
            long_description_it: 'Wie angekündigt, hat sich die SAM-Sportkommission nach der Absage des Supermoto Ramsen an die Arbeit gemacht, um eine Ersatzveranstaltung auf die Beine zu stellen. Dem Sport-Vizepräsidenten Sandro Micheletto und seinem Team ist es gelungen, in Ried Muotathal ein geeignetes Gelände zu finden. Die Landbesitzer und Mieter, sowie die Behörden von Gemeinde und Kanton konnten überzeugt werden, dem Anlass die Bewilligung zu erteilen. ',
            homepage: 'https://www.s-a-m.ch/Termine/EventsDetails/EID/5285/ModuleID/1442?Title=Supermoto+Ried+Muotathal+SZ',
            price_information: 'Saturday:\r\nAdults CHF 15.00\r\nChildren up to 14 free of charge\r\n\r\nSunday:\r\nAdults CHF 20.00\r\nChildren up to 14 free of charge',
            thumbnail_url: 'https://d37dhr5745n0y2.cloudfront.net/c/00/b1/c00b1ea5fea11022394709b8ff574f209d30f95f.jpg',
            address_street: 'Bacheggli',
            address_address_line: 'Micheletto Sandro',
            address_zip: '6434',
            address_city: 'Illgau',
            address_country: 'Schweiz',
            address_venue_name: 'Stoos-Muotatal Tourismus GmbH',
            address_latitude: 46.9872623,
            address_longitude: 8.7277275
        }, {
            event_id: 2014567,
            date: '2019-09-27',
            start_time: '11:00:00.0',
            end_time: '12:00:00.0',
            title_de: 'Swissness. Tradition and innovation',
            title_en: 'Swissness. Tradition and innovation',
            title_fr: 'Swissness. Tradition and innovation',
            title_it: 'Swissness. Tradition and innovation',
            short_description_de: 'Where does the Swiss cross come from? Why do precision and reliability count as much for “Swissness“ as Matterhorn, tunnel construction, cheese and watches? What about Helvetia, Heidi or Wilhelm Tell?',
            short_description_en: 'Where does the Swiss cross come from? Why do precision and reliability count as much for “Swissness“ as Matterhorn, tunnel construction, cheese and watches? What about Helvetia, Heidi or Wilhelm Tell?',
            short_description_fr: 'Where does the Swiss cross come from? Why do precision and reliability count as much for “Swissness“ as Matterhorn, tunnel construction, cheese and watches? What about Helvetia, Heidi or Wilhelm Tell?',
            short_description_it: 'Where does the Swiss cross come from? Why do precision and reliability count as much for “Swissness“ as Matterhorn, tunnel construction, cheese and watches? What about Helvetia, Heidi or Wilhelm Tell?',
            long_description_de: 'Where does the Swiss cross come from? Why do precision and reliability count as much for “Swissness“ as Matterhorn, tunnel construction, cheese and watches? What about Helvetia, Heidi or Wilhelm Tell?\r\n\r\nA guided tour to selected objects around typical Swiss myths, foreign and self-images.',
            long_description_en: 'Where does the Swiss cross come from? Why do precision and reliability count as much for “Swissness“ as Matterhorn, tunnel construction, cheese and watches? What about Helvetia, Heidi or Wilhelm Tell?\r\n\r\nA guided tour to selected objects around typical Swiss myths, foreign and self-images.',
            long_description_fr: 'Where does the Swiss cross come from? Why do precision and reliability count as much for “Swissness“ as Matterhorn, tunnel construction, cheese and watches? What about Helvetia, Heidi or Wilhelm Tell?\r\n\r\nA guided tour to selected objects around typical Swiss myths, foreign and self-images.',
            long_description_it: 'Where does the Swiss cross come from? Why do precision and reliability count as much for “Swissness“ as Matterhorn, tunnel construction, cheese and watches? What about Helvetia, Heidi or Wilhelm Tell?\r\n\r\nA guided tour to selected objects around typical Swiss myths, foreign and self-images.',
            homepage: null,
            price_information: null,
            thumbnail_url: 'https://d37dhr5745n0y2.cloudfront.net/0/88/ec/088ec2164e6b604e838e96017413a7154c910f3f.jpg',
            address_street: 'Museumstrasse 2',
            address_address_line: 'Landesmuseum Zürich',
            address_zip: '8001',
            address_city: 'Zürich',
            address_country: 'Schweiz',
            address_venue_name: 'Schweizerisches Nationalmuseum',
            address_latitude: 47.3790239,
            address_longitude: 8.5410038
        }, {
            event_id: 2014663,
            date: '2019-09-27',
            start_time: null,
            end_time: null,
            title_de: 'swissrent Challenge Days - Zizers/Landquart',
            title_en: 'swissrent Challenge Days',
            title_fr: 'swissrent Challenge Days',
            title_it: 'swissrent Challenge Days',
            short_description_de: 'Willkommen bei den ersten «swissrent Challenge Days»',
            short_description_en: 'Welcome to the first "swissrent Challenge Days"',
            short_description_fr: 'Bienvenue à la première édition des « swissrent Challenge Days ».',
            short_description_it: 'Benvenuti ai primi "swissrent Challenge Days"',
            long_description_de: 'Mit den Bike-Challenges hat swissrent in diesem Frühjahr ein neues, einzigartiges All-Inclusive-Abenteuerprodukt lanciert. Nach dem Start mit der «Dave Kilshaw’s Calanda-Challenge» hat sich mittlerweile auch die «Max Gisler’s Bike Challenge» in Arosa sowie die «Hugeli Bike Challenge» in Gstaad etabliert. Jede der drei gut 20 Kilometer langen Bike-Challenges bietet den Teilnehmerinnen und Teilnehmern nicht nur Ruhm und Ehre sowie coole Give-Away-Präsente, sondern vor allem auch unvergessliche Bike-Erlebnisse in den schönsten Bergregionen der Schweiz.\r\nEnde September könnt ihr nun eure Bike-Challenge-Erlebnisse mit anderen teilen oder euch vom swissrent Bike-Challenge-Fieber anstecken lassen. Denn vom 27. bis zum 29. September lädt swissrent gemeinsam mit den Shop-Partnern vor Ort an den jeweiligen Challenge-Standorten zu den ersten «swissrent Challenge Days» ein. Auf die Besucher warten viele Überraschungen, spannende Bike-Gespräche in entspannter Feier-Atmosphäre sowie eine einmalige Rabatt-Aktion für die Challenge-Teilnahme an einem dieser Tage. Schau auch du vorbei und werde Teil des swissrent Bike-Challenge-Abenteuers!\r\n\r\n<b/>Standort Highlight-Tage<b/>\r\nFreitag 27. Sept. Zizers/Landquart – Bike4Fun/SAC Calanda Hütte\r\nSamstag 28. Sept. Schönried-Gstaad – FRAUTSCHI\r\nSonntag 29. Sept. Arosa – Gisler Sport Valsana\r\n',
            long_description_en: 'This past Spring swissrent launched a new, unique all-inclusive adventure product; Bike Challenges. After the launch of the "Dave Kilshaw\'s Calanda Challenge", the "Max Gisler\'s Bike Challenge" in Arosa and the "Hugeli Bike Challenge" in Gstaad have come along for the ride. Each of the three approximately 20-kilometer bike challenges offers not only fame and glory as well as cool giveaways, but above all, unforgettable bike experiences in the most beautiful mountain regions of Switzerland.\r\n\r\nAt the end of September you can now enjoy your bike challenge experience with others or get infected by the swissrent Bike Challenge fever. From the 27th to the 29th of September, swissrent, together with the local shop partners, will be inviting visitors to the respective Challenge locations for the first «swissrent Challenge Days». There are many surprises awaiting visitors, exciting bike-talk in a relaxed celebratory atmosphere and a one-off discount promotion for taking part over one of these days. Check it out and be part of the swissrent Bike Challenge adventure!\r\n\r\nFriday 27. Sept. Zizers/Landquart – Bike4Fun/SAC Calanda Hütte\r\nSaturday 28. Sept. Schönried-Gstaad – FRAUTSCHI\r\nSunday 29. Sept. Arosa – Gisler Sport Valsana\r\n',
            long_description_fr: 'Au printemps dernier, swissrent a lancé en exclusivité un nouveau produit proposant des aventures où tout est compris : les défis à vélo. Après le lancement du « Dave Kilshaw\'s Calanda Challenge », se sont ajoutés le « Max Gisler\'s Bike Challenge » à Arosa et le « Hugeli Bike Challenge » à Gstaad. Chacun de ces trois défis à vélo est long d\'une vingtaine de kilomètres. Vous pouvez y conquérir la notoriété et la gloire, recevoir des cadeaux sympas, et, surtout, vivre des expériences inoubliables à vélo dans les plus belles régions montagneuses de Suisse.\r\n\r\nÀ la fin du mois de septembre, vous aurez la possibilité de partager votre expérience des défis à vélo ou d\'être vous-même infecté par le virus des défis swissrent. Du 27 au 29 septembre, swissrent et les boutiques partenaires invitent le public à la première édition des «swissrent Challenge Days» sur les sites des différents défis. Ce qui attend les visiteurs : de nombreuses surprises, des discussions passionnantes autour du vélo dans une atmosphère festive et décontractée, ainsi qu\'une promotion unique pour avoir participé à l\'une de ces journées. Renseignez-vous et prenez part à l\'aventure des défis à vélo swissrent !\r\n\r\n27. Sept. Zizers/Landquart – Bike4Fun/SAC Calanda Hütte\r\n28. Sept. Schönried-Gstaad – FRAUTSCHI\r\n29. Sept. Arosa – Gisler Sport Valsana\r\n',
            long_description_it: 'La primavera scorsa swissrent ha lanciato un nuovo prodotto di avventura all-inclusive unico: le Bike Challenge. Dopo il lancio della "Dave Kilshaw\'s Calanda Challenge", la "Max Gisler\'s Bike Challenge" ad Arosa e la "Hugeli Bike Challenge" a Gstaad si sono aggregate lungo il percorso. Ognuna delle tre sfide ciclistiche di circa 20 chilometri offre non solo fama, gloria e fantastici omaggi, ma soprattutto esperienze ciclistiche indimenticabili nelle più belle regioni montane della Svizzera.\r\n\r\nAlla fine di settembre puoi ora goderti la tua esperienza di sfida ciclistica con altri o farti prendere dalla febbre delle Bike Challenge di swissrent. Dal 27 al 29 settembre swissrent inviterà, insieme ai negozi partner locali, i visitatori nelle rispettive località Challenge per i primi «swissrent Challenge Days». Molte sorprese attendono i visitatori, emozionanti chiacchiere di bicicletta in un\'atmosfera rilassata e celebrativa e una promozione scontata una tantum per prendere parte a uno di questi giorni. Dagli un\'occhiata e partecipa all\'avventura delle Bike Challenge di swissrent!\r\n\r\n27. Sept. Zizers/Landquart – Bike4Fun/SAC Calanda Hütte\r\n28. Sept. Schönried-Gstaad – FRAUTSCHI\r\n29. Sept. Arosa – Gisler Sport Valsana\r\n',
            homepage: null,
            price_information: null,
            thumbnail_url: 'https://d37dhr5745n0y2.cloudfront.net/5/0c/af/50caf87a727d7a57e5a3766023ada5f8f5f454a5.jpg',
            address_street: null,
            address_address_line: null,
            address_zip: '7205',
            address_city: 'Zizers',
            address_country: 'Schweiz',
            address_venue_name: '7205 Zizers',
            address_latitude: 46.936766,
            address_longitude: 9.565757
        }, {
            event_id: 2014672,
            date: '2019-09-27',
            start_time: null,
            end_time: null,
            title_de: 'Sylvie Aubry “Soudain surgit l\'étang“',
            title_en: 'Sylvie Aubry “Soudain surgit l\'étang“',
            title_fr: 'Sylvie Aubry “Soudain surgit l\'étang“',
            title_it: 'Sylvie Aubry “Soudain surgit l\'étang“',
            short_description_de: 'Pour l’ouverture de saison, nos cimaises fraîchement rénovées auront le privilège de recevoir les œuvres de Sylvie Aubry. L’artiste franc-montagnarde présentera des peintures récentes ainsi qu’un livre d’artistes pour enfants qu’elle coréalise.',
            short_description_en: 'Pour l’ouverture de saison, nos cimaises fraîchement rénovées auront le privilège de recevoir les œuvres de Sylvie Aubry. L’artiste franc-montagnarde présentera des peintures récentes ainsi qu’un livre d’artistes pour enfants qu’elle coréalise.',
            short_description_fr: 'Pour l’ouverture de saison, nos cimaises fraîchement rénovées auront le privilège de recevoir les œuvres de Sylvie Aubry. L’artiste franc-montagnarde présentera des peintures récentes ainsi qu’un livre d’artistes pour enfants qu’elle coréalise.',
            short_description_it: 'Pour l’ouverture de saison, nos cimaises fraîchement rénovées auront le privilège de recevoir les œuvres de Sylvie Aubry. L’artiste franc-montagnarde présentera des peintures récentes ainsi qu’un livre d’artistes pour enfants qu’elle coréalise.',
            long_description_de: 'Le fil de la peinture\r\nUn jour, je me suis intéressée à l’étang de la Gruère vu du ciel. La fluidité de la forme noire de l’eau m’a surprise, propre à suggérer histoires et fantasmes. Elle m’a parue étrange, bizarrement belle, elle m’a agacée. Au premier regard, j’y voyais un animal en mouvement, figure d’un autre temps, pas à l’échelle de l’homme, portant l’empreinte d’une mutation lente. J’ai voulu voir où cette forme m’entraînerait. Du noir de la tourbe a surgi la couleur.\r\n\r\nLe processus\r\nJe pose un regard très simple sur les paysages. Des signes se forment, les rythmes deviennent visibles. Je note des informations: indications de mouvements, de stabilité, de verticalité, de perspective. Des traces qui renvoient chacun à son vécu et qui peuvent être interprétées… ou non. Ainsi, s’installe une perspective personnelle, géométries immobiles et traces, souvenirs et spontanéités que je nomme: «paysage abstrait».\r\n\r\n«Le livre pour toi»\r\nCette série d’estampes qui dormaient dans mes tiroirs a inspiré Françoise Matthey. De son regard attentif est né un texte poétique. L’album se veut généreux pour l’enfant qui le prendra dans ses mains: quelques accroches amusantes de vocabulaire, un peu de peur mais pas trop, une invitation au partage, et surtout de la tendresse, de l’écoute, une présence. En quelque sorte, un cadeau. \r\n\r\n\r\nSylvie Aubry vit et travaille au Noirmont\r\nsylvieaubry.com\r\n\r\nFrançoise Matthey vit et travaille aux Reussilles \r\naenj.ch/francoise.matthey\n- De 14 heures à 17 heures, du 13.09.2019 au 20.10.2019\r\n- Entrée libre',
            long_description_en: 'Le fil de la peinture\r\nUn jour, je me suis intéressée à l’étang de la Gruère vu du ciel. La fluidité de la forme noire de l’eau m’a surprise, propre à suggérer histoires et fantasmes. Elle m’a parue étrange, bizarrement belle, elle m’a agacée. Au premier regard, j’y voyais un animal en mouvement, figure d’un autre temps, pas à l’échelle de l’homme, portant l’empreinte d’une mutation lente. J’ai voulu voir où cette forme m’entraînerait. Du noir de la tourbe a surgi la couleur.\r\n\r\nLe processus\r\nJe pose un regard très simple sur les paysages. Des signes se forment, les rythmes deviennent visibles. Je note des informations: indications de mouvements, de stabilité, de verticalité, de perspective. Des traces qui renvoient chacun à son vécu et qui peuvent être interprétées… ou non. Ainsi, s’installe une perspective personnelle, géométries immobiles et traces, souvenirs et spontanéités que je nomme: «paysage abstrait».\r\n\r\n«Le livre pour toi»\r\nCette série d’estampes qui dormaient dans mes tiroirs a inspiré Françoise Matthey. De son regard attentif est né un texte poétique. L’album se veut généreux pour l’enfant qui le prendra dans ses mains: quelques accroches amusantes de vocabulaire, un peu de peur mais pas trop, une invitation au partage, et surtout de la tendresse, de l’écoute, une présence. En quelque sorte, un cadeau. \r\n\r\n\r\nSylvie Aubry vit et travaille au Noirmont\r\nsylvieaubry.com\r\n\r\nFrançoise Matthey vit et travaille aux Reussilles \r\naenj.ch/francoise.matthey\n- De 14 heures à 17 heures, du 13.09.2019 au 20.10.2019\r\n- Entrée libre',
            long_description_fr: 'Le fil de la peinture\r\nUn jour, je me suis intéressée à l’étang de la Gruère vu du ciel. La fluidité de la forme noire de l’eau m’a surprise, propre à suggérer histoires et fantasmes. Elle m’a parue étrange, bizarrement belle, elle m’a agacée. Au premier regard, j’y voyais un animal en mouvement, figure d’un autre temps, pas à l’échelle de l’homme, portant l’empreinte d’une mutation lente. J’ai voulu voir où cette forme m’entraînerait. Du noir de la tourbe a surgi la couleur.\r\n\r\nLe processus\r\nJe pose un regard très simple sur les paysages. Des signes se forment, les rythmes deviennent visibles. Je note des informations: indications de mouvements, de stabilité, de verticalité, de perspective. Des traces qui renvoient chacun à son vécu et qui peuvent être interprétées… ou non. Ainsi, s’installe une perspective personnelle, géométries immobiles et traces, souvenirs et spontanéités que je nomme: «paysage abstrait».\r\n\r\n«Le livre pour toi»\r\nCette série d’estampes qui dormaient dans mes tiroirs a inspiré Françoise Matthey. De son regard attentif est né un texte poétique. L’album se veut généreux pour l’enfant qui le prendra dans ses mains: quelques accroches amusantes de vocabulaire, un peu de peur mais pas trop, une invitation au partage, et surtout de la tendresse, de l’écoute, une présence. En quelque sorte, un cadeau. \r\n\r\n\r\nSylvie Aubry vit et travaille au Noirmont\r\nsylvieaubry.com\r\n\r\nFrançoise Matthey vit et travaille aux Reussilles \r\naenj.ch/francoise.matthey\n- De 14 heures à 17 heures, du 13.09.2019 au 20.10.2019\r\n- Entrée libre',
            long_description_it: 'Le fil de la peinture\r\nUn jour, je me suis intéressée à l’étang de la Gruère vu du ciel. La fluidité de la forme noire de l’eau m’a surprise, propre à suggérer histoires et fantasmes. Elle m’a parue étrange, bizarrement belle, elle m’a agacée. Au premier regard, j’y voyais un animal en mouvement, figure d’un autre temps, pas à l’échelle de l’homme, portant l’empreinte d’une mutation lente. J’ai voulu voir où cette forme m’entraînerait. Du noir de la tourbe a surgi la couleur.\r\n\r\nLe processus\r\nJe pose un regard très simple sur les paysages. Des signes se forment, les rythmes deviennent visibles. Je note des informations: indications de mouvements, de stabilité, de verticalité, de perspective. Des traces qui renvoient chacun à son vécu et qui peuvent être interprétées… ou non. Ainsi, s’installe une perspective personnelle, géométries immobiles et traces, souvenirs et spontanéités que je nomme: «paysage abstrait».\r\n\r\n«Le livre pour toi»\r\nCette série d’estampes qui dormaient dans mes tiroirs a inspiré Françoise Matthey. De son regard attentif est né un texte poétique. L’album se veut généreux pour l’enfant qui le prendra dans ses mains: quelques accroches amusantes de vocabulaire, un peu de peur mais pas trop, une invitation au partage, et surtout de la tendresse, de l’écoute, une présence. En quelque sorte, un cadeau. \r\n\r\n\r\nSylvie Aubry vit et travaille au Noirmont\r\nsylvieaubry.com\r\n\r\nFrançoise Matthey vit et travaille aux Reussilles \r\naenj.ch/francoise.matthey\n- De 14 heures à 17 heures, du 13.09.2019 au 20.10.2019\r\n- Entrée libre',
            homepage: 'https://www.ccl-sti.ch/',
            price_information: null,
            thumbnail_url: 'https://d37dhr5745n0y2.cloudfront.net/7/82/0c/7820cc682c0db38e08caf2450d5ad51656fdca71.jpg',
            address_street: 'Rue du Marché 6',
            address_address_line: null,
            address_zip: '2610',
            address_city: 'St-Imier',
            address_country: 'Schweiz',
            address_venue_name: 'Centre de culture et de loisirs CCL de l\'Erguël',
            address_latitude: 47.1518607,
            address_longitude: 6.9965585
        }, {
            event_id: 2014883,
            date: '2019-09-27',
            start_time: '19:30:00.0',
            end_time: '22:00:00.0',
            title_de: 'Tanzmarathon',
            title_en: 'Tanzmarathon',
            title_fr: 'Tanzmarathon',
            title_it: 'Tanzmarathon',
            short_description_de: 'Ein Intergenerationen-Tanztheater mit neun professionellen Urban Dancers und elf Tänzer*innen des Tanztheaters Dritter Frühling',
            short_description_en: 'Ein Intergenerationen-Tanztheater mit neun professionellen Urban Dancers und elf Tänzer*innen des Tanztheaters Dritter Frühling',
            short_description_fr: 'Ein Intergenerationen-Tanztheater mit neun professionellen Urban Dancers und elf Tänzer*innen des Tanztheaters Dritter Frühling',
            short_description_it: 'Ein Intergenerationen-Tanztheater mit neun professionellen Urban Dancers und elf Tänzer*innen des Tanztheaters Dritter Frühling',
            long_description_de: 'TANZMARATHON erzählt die Geschehnisse rund um einen erbarmungslosen Tanz-Wettbewerb in den 2030er Jahren. Jung und Alt leiden unter einer Wirtschaftskrise, die AHV ist weggefallen, durch zunehmende Technisierung haben auch jüngere Menschen zu wenig Arbeit und Geld. Am reisserisch einer voyeuristischen Öffentlichkeit vorgeführten Tanz-Wettbewerb nehmen Menschen U25 und ü60 teil in der Hoffnung auf einen grossen Geldgewinn, teilweise in altersgemischten Paaren. Zentrale Themen der Inszenierung: Altersarmut, Jugendarbeitslosigkeit, Reality-Shows, Voyeurismus - Generationenkonflikte und -solidarität. Das Tanztheater Dritter Frühling zeigt einen Abend, der getanzte und gespielte Tragödie, Show und absurde Komödie in einem ist.\n\nMitwirkende und Zusatzinformationen:\n\n<strong>Tanz und Schauspiel</strong>\n\nChantal Brügger, Alojz J. «Ljubo» Cerar, Helmut Dasing, Antoine Cedric Ekomo a.k.a Aceko, Janine Gehri, Gret Hüni-Geiger, Monika Kellenberger, Verena Kromer, Jenoe Marranchelli, Susanne Schulthess, Gaetano Sibilia, Urbain Guiguemdé, Audrey Wagner, Samuel Müri, Olivia Rufer, Toschkin Schalnich, Juliane Steenbeck, Heidi Steiner, Vera Teuteberg, Kaspar Wohnlich\n\n<strong>Team</strong>\n\nKünstlerische Gesamtleitung: Roger Nydegger und Béatrice Goetz\n\nText: Brigitta Paulina Javurek\n\nAssistenz: Juliane Steenbeck und Angela Weber\n\nKostüm/Bühnenbild: Doris Berger\n\nLive-Musik: Andi Peter &amp; KABEL\n\nTechnik/Licht: Jan Humbel\n\nVideo/Design Plakat u. Flyer: Susanne Hofer &amp; Flimmern\n\nCo-Produktionsleitung: Laurent Schönherr &amp; Johanna-Maria Raimund\n\nFotografie, Website, Social Media: Atelier Schönherr',
            long_description_en: 'TANZMARATHON erzählt die Geschehnisse rund um einen erbarmungslosen Tanz-Wettbewerb in den 2030er Jahren. Jung und Alt leiden unter einer Wirtschaftskrise, die AHV ist weggefallen, durch zunehmende Technisierung haben auch jüngere Menschen zu wenig Arbeit und Geld. Am reisserisch einer voyeuristischen Öffentlichkeit vorgeführten Tanz-Wettbewerb nehmen Menschen U25 und ü60 teil in der Hoffnung auf einen grossen Geldgewinn, teilweise in altersgemischten Paaren. Zentrale Themen der Inszenierung: Altersarmut, Jugendarbeitslosigkeit, Reality-Shows, Voyeurismus - Generationenkonflikte und -solidarität. Das Tanztheater Dritter Frühling zeigt einen Abend, der getanzte und gespielte Tragödie, Show und absurde Komödie in einem ist.\n\nMitwirkende und Zusatzinformationen:\n\n<strong>Tanz und Schauspiel</strong>\n\nChantal Brügger, Alojz J. «Ljubo» Cerar, Helmut Dasing, Antoine Cedric Ekomo a.k.a Aceko, Janine Gehri, Gret Hüni-Geiger, Monika Kellenberger, Verena Kromer, Jenoe Marranchelli, Susanne Schulthess, Gaetano Sibilia, Urbain Guiguemdé, Audrey Wagner, Samuel Müri, Olivia Rufer, Toschkin Schalnich, Juliane Steenbeck, Heidi Steiner, Vera Teuteberg, Kaspar Wohnlich\n\n<strong>Team</strong>\n\nKünstlerische Gesamtleitung: Roger Nydegger und Béatrice Goetz\n\nText: Brigitta Paulina Javurek\n\nAssistenz: Juliane Steenbeck und Angela Weber\n\nKostüm/Bühnenbild: Doris Berger\n\nLive-Musik: Andi Peter &amp; KABEL\n\nTechnik/Licht: Jan Humbel\n\nVideo/Design Plakat u. Flyer: Susanne Hofer &amp; Flimmern\n\nCo-Produktionsleitung: Laurent Schönherr &amp; Johanna-Maria Raimund\n\nFotografie, Website, Social Media: Atelier Schönherr',
            long_description_fr: 'TANZMARATHON erzählt die Geschehnisse rund um einen erbarmungslosen Tanz-Wettbewerb in den 2030er Jahren. Jung und Alt leiden unter einer Wirtschaftskrise, die AHV ist weggefallen, durch zunehmende Technisierung haben auch jüngere Menschen zu wenig Arbeit und Geld. Am reisserisch einer voyeuristischen Öffentlichkeit vorgeführten Tanz-Wettbewerb nehmen Menschen U25 und ü60 teil in der Hoffnung auf einen grossen Geldgewinn, teilweise in altersgemischten Paaren. Zentrale Themen der Inszenierung: Altersarmut, Jugendarbeitslosigkeit, Reality-Shows, Voyeurismus - Generationenkonflikte und -solidarität. Das Tanztheater Dritter Frühling zeigt einen Abend, der getanzte und gespielte Tragödie, Show und absurde Komödie in einem ist.\n\nMitwirkende und Zusatzinformationen:\n\n<strong>Tanz und Schauspiel</strong>\n\nChantal Brügger, Alojz J. «Ljubo» Cerar, Helmut Dasing, Antoine Cedric Ekomo a.k.a Aceko, Janine Gehri, Gret Hüni-Geiger, Monika Kellenberger, Verena Kromer, Jenoe Marranchelli, Susanne Schulthess, Gaetano Sibilia, Urbain Guiguemdé, Audrey Wagner, Samuel Müri, Olivia Rufer, Toschkin Schalnich, Juliane Steenbeck, Heidi Steiner, Vera Teuteberg, Kaspar Wohnlich\n\n<strong>Team</strong>\n\nKünstlerische Gesamtleitung: Roger Nydegger und Béatrice Goetz\n\nText: Brigitta Paulina Javurek\n\nAssistenz: Juliane Steenbeck und Angela Weber\n\nKostüm/Bühnenbild: Doris Berger\n\nLive-Musik: Andi Peter &amp; KABEL\n\nTechnik/Licht: Jan Humbel\n\nVideo/Design Plakat u. Flyer: Susanne Hofer &amp; Flimmern\n\nCo-Produktionsleitung: Laurent Schönherr &amp; Johanna-Maria Raimund\n\nFotografie, Website, Social Media: Atelier Schönherr',
            long_description_it: 'TANZMARATHON erzählt die Geschehnisse rund um einen erbarmungslosen Tanz-Wettbewerb in den 2030er Jahren. Jung und Alt leiden unter einer Wirtschaftskrise, die AHV ist weggefallen, durch zunehmende Technisierung haben auch jüngere Menschen zu wenig Arbeit und Geld. Am reisserisch einer voyeuristischen Öffentlichkeit vorgeführten Tanz-Wettbewerb nehmen Menschen U25 und ü60 teil in der Hoffnung auf einen grossen Geldgewinn, teilweise in altersgemischten Paaren. Zentrale Themen der Inszenierung: Altersarmut, Jugendarbeitslosigkeit, Reality-Shows, Voyeurismus - Generationenkonflikte und -solidarität. Das Tanztheater Dritter Frühling zeigt einen Abend, der getanzte und gespielte Tragödie, Show und absurde Komödie in einem ist.\n\nMitwirkende und Zusatzinformationen:\n\n<strong>Tanz und Schauspiel</strong>\n\nChantal Brügger, Alojz J. «Ljubo» Cerar, Helmut Dasing, Antoine Cedric Ekomo a.k.a Aceko, Janine Gehri, Gret Hüni-Geiger, Monika Kellenberger, Verena Kromer, Jenoe Marranchelli, Susanne Schulthess, Gaetano Sibilia, Urbain Guiguemdé, Audrey Wagner, Samuel Müri, Olivia Rufer, Toschkin Schalnich, Juliane Steenbeck, Heidi Steiner, Vera Teuteberg, Kaspar Wohnlich\n\n<strong>Team</strong>\n\nKünstlerische Gesamtleitung: Roger Nydegger und Béatrice Goetz\n\nText: Brigitta Paulina Javurek\n\nAssistenz: Juliane Steenbeck und Angela Weber\n\nKostüm/Bühnenbild: Doris Berger\n\nLive-Musik: Andi Peter &amp; KABEL\n\nTechnik/Licht: Jan Humbel\n\nVideo/Design Plakat u. Flyer: Susanne Hofer &amp; Flimmern\n\nCo-Produktionsleitung: Laurent Schönherr &amp; Johanna-Maria Raimund\n\nFotografie, Website, Social Media: Atelier Schönherr',
            homepage: 'https://www.tanzmarathon.ch',
            price_information: 'CHF 36.00 / 25.00 / 15.00',
            thumbnail_url: 'https://d37dhr5745n0y2.cloudfront.net/b/b3/30/bb33091851383c96329a9df59216d5715fa20dc8.jpg',
            address_street: 'Hardturmstrasse 122',
            address_address_line: null,
            address_zip: '8005',
            address_city: 'Zürich',
            address_country: 'Schweiz',
            address_venue_name: 'KulturZüri',
            address_latitude: 47.3931789,
            address_longitude: 8.5146315
        }];
        return of(ACTIVITIES);
    }
}
