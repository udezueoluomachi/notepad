import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  GDrive,
  MimeTypes,
  ListQueryBuilder,
} from "@robinbobin/react-native-google-drive-api-wrapper";
import Uploader from "@robinbobin/react-native-google-drive-api-wrapper/api/aux/uploaders/Uploader";

export async function createNoteFile() {
    try {
        const gdrive = new GDrive();
        gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
        const note = await gdrive.files.createIfNotExists({
            q: new ListQueryBuilder()
              .e("name", "notepadAppBy@udezueoluomachi")
              .and()
              .in("root", "parents")
        }, Uploader.execute())
        console.log(note)
    }
    catch (error) {
        console.log(error)
    }
}