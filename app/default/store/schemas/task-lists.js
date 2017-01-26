import {normalize, schema} from 'normalizr';


const story = new schema.Entity('stories');

const task = new schema.Entity('tasks', {
    stories: [story],
});

const list = new schema.Entity('lists', {
    tasks: [task],
});

const lists = [list];

export const normalizeTasks = function(data) {
    return normalize(data, lists);
};
