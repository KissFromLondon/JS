import shortid from "shortid";
import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS } from "./utils/constants";
import initialNotes from "./utils/initial-notes";
import Notepad from "./utils/notepad-model";
import { createListItem, createNoteContent, createNoteFooter, createNoteSection, createActionButton, renderNoteList, refs, addListItem, handleEditorSubmit, removeListItem, filterNotes } from "./utils/view";



