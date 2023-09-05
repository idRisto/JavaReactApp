package com.example.demo;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

  @Autowired
  private BookService bookService;

  @GetMapping ("/books")
  public List<Book> getBooks () {
    return bookService.getBooks ();
  }

  @GetMapping ("/book/{id}")
  public Optional<Book> bookById (@PathVariable int id) {
    return bookService.getBookById (id);
  }

  @PostMapping ("/add")
  public boolean addNewBook (@RequestBody Map<String, Object> jsonMapping) {
    String author = jsonMapping.get("author").toString();
    String title = jsonMapping.get("title").toString();
    String desc = jsonMapping.get("description").toString();
    if (bookService.addBookToDb (author, title, desc) == true) 
      return true;
    else
      return false;
  }

  @PutMapping ("/update/{id}")
  public String updateBook (@PathVariable int id, @RequestBody Map<String, Object> jsonMapping) {
    String author = jsonMapping.get("author").toString();
    String title = jsonMapping.get("title").toString();
    String desc = jsonMapping.get("description").toString();
    if (bookService.updateBook (id, author, title, desc) == true) 
      return "Done";
    else
      return "Could not update book data";
  }

  @DeleteMapping ("/delete/{id}")
  public String deleteBook (@PathVariable int id) {
    if (bookService.deleteBook (id) == true) 
      return "Done";
    else
      return "Could not delete book";
  }
}
