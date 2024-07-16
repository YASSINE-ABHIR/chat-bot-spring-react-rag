package ma.yassine.finalexamrag.services;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;
import ma.yassine.finalexamrag.entities.Person;
import ma.yassine.finalexamrag.repositories.PersonRepository;

@BrowserCallable
@AnonymousAllowed
public class PersonService extends CrudRepositoryService<Person, Long, PersonRepository>  {
}
